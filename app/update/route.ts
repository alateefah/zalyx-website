import { NextResponse } from 'next/server';
import { storeDestination } from '@/lib/storeRedirect';

// The response depends on a request header, so it must never be cached at build
// time — every visitor gets the store for the device they are actually holding.
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const destination = storeDestination(request.headers.get('user-agent'));
  return NextResponse.redirect(new URL(destination, request.url), 302);
}
