import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === '/api/contact') {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/', request.url));
}
