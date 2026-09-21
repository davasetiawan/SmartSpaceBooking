import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get('accept') || '';

  // Intercept API root check on '/' if request does not explicitly ask for HTML document
  if (pathname === '/') {
    const isHtmlDocument = accept.includes('text/html');
    if (!isHtmlDocument) {
      const backendUrl = new URL('/', process.env.BACKEND_URL || 'http://localhost:3001');
      return NextResponse.rewrite(backendUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
