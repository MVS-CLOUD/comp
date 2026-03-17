const ORG_ID_PATTERN = /^\/(org_[^/?#]+)/;

function normalizePath(input: string): string {
  if (input.startsWith('http://') || input.startsWith('https://')) {
    try {
      return new URL(input).pathname;
    } catch {
      return input;
    }
  }

  return input.split('?')[0]?.split('#')[0] ?? input;
}

export function extractOrganizationIdFromPath(
  pathOrUrl?: string | null,
): string | undefined {
  if (!pathOrUrl) {
    return undefined;
  }

  const pathname = normalizePath(pathOrUrl);
  const match = pathname.match(ORG_ID_PATTERN);

  return match?.[1];
}

export function getClientOrganizationId(
  explicitOrganizationId?: string,
): string | undefined {
  if (explicitOrganizationId) {
    return explicitOrganizationId;
  }

  if (typeof window === 'undefined') {
    return undefined;
  }

  return extractOrganizationIdFromPath(window.location.pathname);
}
