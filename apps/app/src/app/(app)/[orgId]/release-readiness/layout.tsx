import { requireRoutePermission } from '@/lib/permissions.server';
import type { ReactNode } from 'react';

export default async function ReleaseReadinessLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  await requireRoutePermission('release-readiness', orgId);

  return children;
}
