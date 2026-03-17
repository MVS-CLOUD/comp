import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Skip auth-related routes and static assets
    '/((?!api|_next/static|_next/image|favicon.ico|monitoring|ingest|research|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.ico$|.*\\.webp$).*)',
  ],
};

export async function proxy(request: NextRequest) {
  try {
    // E2E Test Mode: Check for test auth header
    if (process.env.E2E_TEST_MODE === 'true') {
      const testAuthHeader = request.headers.get('x-e2e-test-auth');
      if (testAuthHeader) {
        try {
          const testAuth = JSON.parse(testAuthHeader);
          if (testAuth.bypass) {
            // Allow the request to proceed without auth checks
            const response = NextResponse.next();
            response.headers.set('x-pathname', request.nextUrl.pathname);
            return response;
          }
        } catch (e) {
          // Invalid test auth header, continue with normal auth flow
        }
      }
    }

    const nextUrl = request.nextUrl;
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set('x-pathname', nextUrl.pathname);

    const intent = nextUrl.searchParams.get('intent') || '';
    if (intent) {
      requestHeaders.set('x-intent', intent);
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Allow unauthenticated access to invite routes
    if (nextUrl.pathname.startsWith('/invite/')) {
      return response;
    }

    // Allow unauthenticated access to unsubscribe routes
    if (nextUrl.pathname === '/unsubscribe' || nextUrl.pathname.startsWith('/unsubscribe/')) {
      return response;
    }

    // Auth checks happen in server layouts/pages so there is only one
    // source of truth for session validation.

    return response;
  } catch (err) {
    console.error('[Proxy] error', err);
    return NextResponse.next();
  }
}
