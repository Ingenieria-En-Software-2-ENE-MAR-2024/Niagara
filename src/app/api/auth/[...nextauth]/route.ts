import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          if (!res.ok) {
            const errorBody = await res.json()
            console.error(
              `HTTP error! status: ${res.status}, body: ${JSON.stringify(errorBody)}`,
            )
            throw new Error(`HTTP error! status: ${res.status}`)
          }

          const user = await res.json()

          if (user) {
            return user
          } else {
            return null
          }
        } catch (error) {
          console.error(error)
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
