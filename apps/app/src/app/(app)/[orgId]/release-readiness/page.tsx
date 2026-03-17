import { serverApi } from '@/lib/api-server';
import { hasPermission } from '@/lib/permissions';
import { resolveCurrentUserPermissions } from '@/lib/permissions.server';
import { PageHeader, PageLayout } from '@trycompai/design-system';
import { ReleaseReadinessClient } from './components/ReleaseReadinessClient';
import type {
  HealthcareFramework,
  ReleaseDefinition,
  ReleaseRun,
  ReleaseSubject,
} from './types';

export async function generateMetadata() {
  return { title: 'Release Readiness' };
}

export default async function ReleaseReadinessPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  const permissions = await resolveCurrentUserPermissions(orgId);
  const canInstallHealthcareFrameworks = permissions
    ? hasPermission(permissions, 'framework', 'create')
    : false;
  const canCreate = permissions
    ? hasPermission(permissions, 'framework', 'create')
    : false;
  const canUpdate = permissions
    ? hasPermission(permissions, 'framework', 'update')
    : false;
  const [frameworkLibraryRes, subjectsRes, definitionsRes, runsRes] =
    await Promise.all([
      serverApi.get<{ data: HealthcareFramework[] }>(
        '/v1/frameworks/healthcare/library',
      ),
      serverApi.get<{ data: ReleaseSubject[] }>(
        '/v1/release-readiness/subjects',
      ),
      serverApi.get<{ data: ReleaseDefinition[] }>(
        '/v1/release-readiness/definitions',
      ),
      serverApi.get<{ data: ReleaseRun[] }>('/v1/release-readiness/runs'),
    ]);

  const frameworkLibrary = frameworkLibraryRes.data?.data ?? [];
  const subjects = subjectsRes.data?.data ?? [];
  const definitions = definitionsRes.data?.data ?? [];
  const runs = runsRes.data?.data ?? [];
  const errors = [
    frameworkLibraryRes.error,
    subjectsRes.error,
    definitionsRes.error,
    runsRes.error,
  ].filter(Boolean);

  return (
    <PageLayout header={<PageHeader title="Release readiness" />}>
      <div className="space-y-6">
        {errors.length > 0 ? (
          <section className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
            <h2 className="text-base font-semibold text-foreground">
              Data loading issues
            </h2>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </section>
        ) : null}
        <ReleaseReadinessClient
          organizationId={orgId}
          frameworkLibrary={frameworkLibrary}
          initialSubjects={subjects}
          initialDefinitions={definitions}
          initialRuns={runs}
          canCreate={canCreate}
          canUpdate={canUpdate}
          canInstallHealthcareFrameworks={canInstallHealthcareFrameworks}
        />
      </div>
    </PageLayout>
  );
}
