import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  let abVariantOptions: Record<string, string[]> = {
    priceVariant: ['0', '1'], // fallback if fetch fails
    ctaVariant: ['0', '1'],
    layoutVariant: ['A', 'B'],
  };

  // Fetch allowed variant configs from internal API route
  try {
    const res = await fetch(`${request.nextUrl.origin}/api/ab-variants`, {
      cache: 'no-store',
    });
    if (res.ok) {
      abVariantOptions = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch variant config. Using fallback.');
  }

  // Apply logic per variant key
  Object.entries(abVariantOptions).forEach(([key, allowedVariants]) => {
    const incoming = request.nextUrl.searchParams.get(key);
    const current = request.cookies.get(key)?.value;

    if (incoming) {
      if (allowedVariants.includes(incoming)) {
        response.cookies.set(key, incoming, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        });
      } else if (current) {
        response.cookies.set(key, current, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        });
      }
    }
  });

  return response;
}

export const config = {
  matcher: ['/page', '/other-ab-routes'], // 👈 adjust this to match your AB test routes
};
