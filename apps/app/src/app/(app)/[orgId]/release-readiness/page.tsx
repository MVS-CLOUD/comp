import { serverApi } from '@/lib/api-server';
import { hasPermission } from '@/lib/permissions';
import { resolveCurrentUserPermissions } from '@/lib/permissions.server';
import { PageHeader, PageLayout } from '@trycompai/design-system';
import { InstallHealthcareFrameworksButton } from './components/InstallHealthcareFrameworksButton';

type HealthcareFramework = {
  id: string;
  name: string;
  requirements?: Array<{ id: string }>;
};

type ReleaseSubject = {
  id: string;
  name: string;
  type: string;
  environment: string | null;
};

type ReleaseDefinition = {
  id: string;
  name: string;
  requiredFrameworkIds: string[];
  requiredCheckIds: string[];
};

type ReleaseRun = {
  id: string;
  version: string;
  status: string;
  commitSha: string | null;
  buildId: string | null;
};

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
        <div className="grid gap-4 md:grid-cols-4">
          <SummaryCard label="Healthcare frameworks" value={frameworkLibrary.length} />
          <SummaryCard label="Release subjects" value={subjects.length} />
          <SummaryCard label="Release definitions" value={definitions.length} />
          <SummaryCard label="Release runs" value={runs.length} />
        </div>

        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-base font-semibold text-foreground">
            Native healthcare framework library
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These frameworks are seeded into the framework editor path and can be
            instantiated into the current organization.
          </p>
          {canInstallHealthcareFrameworks ? (
            <div className="mt-4">
              <InstallHealthcareFrameworksButton organizationId={orgId} />
            </div>
          ) : null}
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {frameworkLibrary.map((framework) => (
              <div
                key={framework.id}
                className="rounded-md border border-border bg-background p-3"
              >
                <div className="text-sm font-medium text-foreground">
                  {framework.name}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {framework.requirements?.length ?? 0} requirements
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <ListCard
            title="Release subjects"
            emptyLabel="No release subjects have been created yet."
            items={subjects.map((subject) => ({
              id: subject.id,
              title: subject.name,
              detail: `${subject.type}${subject.environment ? ` • ${subject.environment}` : ''}`,
            }))}
          />
          <ListCard
            title="Release definitions"
            emptyLabel="No release definitions have been created yet."
            items={definitions.map((definition) => ({
              id: definition.id,
              title: definition.name,
              detail: `${definition.requiredFrameworkIds.length} frameworks • ${definition.requiredCheckIds.length} checks`,
            }))}
          />
          <ListCard
            title="Recent release runs"
            emptyLabel="No release runs have been created yet."
            items={runs.map((run) => ({
              id: run.id,
              title: run.version,
              detail: `${run.status}${run.commitSha ? ` • ${run.commitSha.slice(0, 8)}` : ''}`,
            }))}
          />
        </section>
      </div>
    </PageLayout>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}

function ListCard({
  title,
  items,
  emptyLabel,
}: {
  title: string;
  items: Array<{ id: string; title: string; detail: string }>;
  emptyLabel: string;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <div className="mt-3 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-md border border-border bg-background p-3">
              <div className="text-sm font-medium text-foreground">{item.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{item.detail}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
