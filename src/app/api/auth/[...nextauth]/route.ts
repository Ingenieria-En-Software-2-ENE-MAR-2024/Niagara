import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
// import { getUserByName } from "../../helpers/userService";
import jwt from 'jsonwebtoken'
// import bcrypt from "bcryptjs";

// const JWT_SECRET = process.env.JWT_SECRET || "turing0210";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }

//   const { userName, password } = req.body;
//   const user = await getUserByName(userName);

//   if (!user) {
//     return res.status(401).json({ message: "Incorrect username or password" });
//   }

//   if (user.password === null) {
//     return res.status(401).json({ message: "Incorrect username or password" });
//   }

//   const passwordMatches = await bcrypt.compare(password, user.password);

//   if (!passwordMatches) {
//     return res.status(401).json({ message: "Incorrect username or password" });
//   }

//   const token = jwt.sign({ userName: user.username }, JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   res.status(200).json({ message: "Successful login", token });
// }

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
          const res = await axios.get('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          const user = await res.data

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
