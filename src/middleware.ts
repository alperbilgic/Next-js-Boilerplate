import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

// Simple check for protected routes
const isProtectedRoute = (pathname: string) => {
  return pathname.includes('/dashboard');
};

// Simple check for auth pages
const isAuthPage = (pathname: string) => {
  return pathname.includes('/sign-in')
    || pathname.includes('/sign-up')
    || pathname.includes('/reset-password')
    || pathname.includes('/verify-email');
};

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, and monitoring
  if (
    pathname.startsWith('/api/')
    || pathname.startsWith('/_next/')
    || pathname.startsWith('/_vercel/')
    || pathname.startsWith('/monitoring')
    || pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (isProtectedRoute(pathname)) {
    // Check for session cookie (Better Auth uses 'better-auth.session_token' by default)
    const sessionToken = request.cookies.get('better-auth.session_token');

    if (!sessionToken) {
      // Extract locale from pathname if present
      const locale = pathname.match(/^\/([a-z]{2})\//)?.[1];
      const signInPath = locale ? `/${locale}/sign-in` : '/sign-in';

      return NextResponse.redirect(new URL(signInPath, request.url));
    }
  }

  // Redirect to dashboard if accessing auth pages while authenticated
  if (isAuthPage(pathname)) {
    const sessionToken = request.cookies.get('better-auth.session_token');

    if (sessionToken) {
      const locale = pathname.match(/^\/([a-z]{2})\//)?.[1];
      const dashboardPath = locale ? `/${locale}/dashboard` : '/dashboard';

      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  // Handle i18n routing
  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|_next|_vercel|monitoring|.*\\..*).*)',
};
