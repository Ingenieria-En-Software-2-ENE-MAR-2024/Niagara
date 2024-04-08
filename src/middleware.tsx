import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { check_privileges } from './routes'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequestWithAuth) {},
  {
    callbacks: {
      authorized: ({ req, token }) =>
        check_privileges(req.nextUrl, token?.role as string | null) ===
        'authorized',
    },
  },
)

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login/:path*',
    '/homeAuth/:path*',
    '/homeMedic/:path*',
    '/homeDummy2/:path*',
    '/homeDummy3/:path*',
    '/niagarahome/:path*',
    '/admin/:path*',
    '/appointmentForm/:path*',
    '/appointments/:path*',
    '/medicalCalendar/:path*',
    '/profile/:path*',
    '/changePassword/:path*',
    '/createMedicalHistory/:path*',
    '/editMedicalHistory/:path*',
    '/medicalHistory/:path*',
  ],
}
