import { describe, expect, it } from 'vitest';
import { extractOrganizationIdFromPath } from './organization-id';

describe('extractOrganizationIdFromPath', () => {
  it('extracts an org id from a pathname', () => {
    expect(
      extractOrganizationIdFromPath('/org_12345/frameworks'),
    ).toBe('org_12345');
  });

  it('extracts an org id from a full URL', () => {
    expect(
      extractOrganizationIdFromPath(
        'https://compai.mvscloud.com/org_abc123/release-readiness?r=1',
      ),
    ).toBe('org_abc123');
  });

  it('returns undefined when the path is not org-scoped', () => {
    expect(extractOrganizationIdFromPath('/auth')).toBeUndefined();
  });

  it('returns undefined for empty input', () => {
    expect(extractOrganizationIdFromPath('')).toBeUndefined();
    expect(extractOrganizationIdFromPath(null)).toBeUndefined();
    expect(extractOrganizationIdFromPath(undefined)).toBeUndefined();
  });
});
