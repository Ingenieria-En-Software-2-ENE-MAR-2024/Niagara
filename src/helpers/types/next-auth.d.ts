import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name: string
      email: string
      role: string
      accessToken: string
      ci: string
    }
  }
}
