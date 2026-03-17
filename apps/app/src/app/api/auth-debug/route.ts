import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3333';

export async function GET() {
  const hdrs = await headers();
  const cookieHeader = hdrs.get('cookie') || '';
  const hasBetterAuth = cookieHeader.includes('better-auth');
  const hasSecure = cookieHeader.includes('__Secure-better-auth');

  const cookieNames = cookieHeader
    .split(';')
    .map((c) => c.trim().split('=')[0])
    .filter(Boolean);

  let sessionStatus = 'not-attempted';
  let sessionError: string | null = null;
  let responseStatus = 0;

  try {
    const forwardHeaders: Record<string, string> = {};
    hdrs.forEach((value, key) => {
      const k = key.toLowerCase();
      if (k === 'cookie' || k === 'origin' || k.startsWith('x-')) {
        forwardHeaders[key] = value;
      }
    });
    if (!forwardHeaders.origin && !forwardHeaders.Origin) {
      forwardHeaders.origin = API_URL;
    }

    const response = await fetch(`${API_URL}/api/auth/get-session`, {
      method: 'GET',
      headers: {
        ...forwardHeaders,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    responseStatus = response.status;

    if (!response.ok) {
      const text = await response.text();
      sessionStatus = 'api-error';
      sessionError = `${response.status} ${response.statusText}: ${text.slice(0, 500)}`;
    } else {
      const data = await response.json();
      sessionStatus = data?.session ? 'valid' : 'empty-response';
    }
  } catch (error) {
    sessionStatus = 'fetch-error';
    sessionError =
      error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }

  return NextResponse.json({
    apiUrl: API_URL,
    backendApiUrl: process.env.BACKEND_API_URL || '(not set)',
    nextPublicApiUrl: process.env.NEXT_PUBLIC_API_URL || '(not set)',
    cookieNames,
    hasBetterAuthCookie: hasBetterAuth,
    hasSecureCookie: hasSecure,
    sessionStatus,
    sessionError,
    responseStatus,
  });
}
