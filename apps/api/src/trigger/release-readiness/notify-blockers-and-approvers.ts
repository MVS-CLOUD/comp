import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { createElement } from 'react';
import { z } from 'zod';
import { triggerEmail } from '../../email/trigger-email';

export const notifyBlockersAndApproversTask = schemaTask({
  id: 'notify-blockers-and-approvers',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
    decision: z.enum(['pass', 'fail', 'conditional']),
    summary: z.string(),
  }),
  run: async ({ organizationId, releaseRunId, decision, summary }) => {
    const releaseRun = await db.releaseRun.findUnique({
      where: { id: releaseRunId },
      select: { organizationId: true, releaseSubjectId: true },
    });

    if (!releaseRun || releaseRun.organizationId !== organizationId) {
      throw new Error('Release run not found');
    }

    const [pendingApprovers, adminMembers] = await Promise.all([
      db.manualAttestation.findMany({
        where: {
          organizationId,
          releaseRunId,
          status: 'pending',
          approverId: { not: null },
        },
        select: {
          approver: {
            select: {
              user: {
                select: {
                  email: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      db.member.findMany({
        where: {
          organizationId,
          deactivated: false,
          OR: [{ role: { contains: 'owner' } }, { role: { contains: 'admin' } }],
        },
        select: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      }),
    ]);

    const recipients = new Map<string, string>();
    for (const row of pendingApprovers) {
      const email = row.approver?.user.email;
      if (email) {
        recipients.set(email, row.approver?.user.name || email);
      }
    }
    for (const row of adminMembers) {
      const email = row.user.email;
      if (email) {
        recipients.set(email, row.user.name || email);
      }
    }

    const artifact = await db.evidenceArtifact.create({
      data: {
        organizationId,
        releaseRunId,
        releaseSubjectId: releaseRun.releaseSubjectId,
        title: 'Release notification record',
        artifactType: 'release_notification',
        evidenceClass: 'manual_attested',
        gateEligible: false,
        reviewStatus: 'approved',
        metadata: {
          decision,
          summary,
          notifiedAt: new Date().toISOString(),
        },
      },
    });

    logger.info('Prepared blocker and approver notification', {
      organizationId,
      releaseRunId,
      decision,
      summary,
    });

    const subject =
      decision === 'pass'
        ? `Release ${releaseRunId} passed`
        : `Release ${releaseRunId} requires attention`;

    for (const [email, name] of recipients.entries()) {
      await triggerEmail({
        to: email,
        subject,
        system: true,
        react: createElement(
          'div',
          null,
          createElement(
            'p',
            null,
            `Hello ${name},`,
          ),
          createElement(
            'p',
            null,
            `Release run ${releaseRunId} is currently ${decision}.`,
          ),
          createElement('p', null, summary),
        ),
      });
    }

    return {
      organizationId,
      releaseRunId,
      decision,
      summary,
      artifactId: artifact.id,
      recipients: recipients.size,
      notifiedAt: new Date().toISOString(),
    };
  },
});
