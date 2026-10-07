import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Don't match the root path - let the client-side detection component handle it
  matcher: ['/(ar|en|fr|es|de|pt|it|zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
