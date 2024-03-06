import NextAuth from 'next-auth';

export default NextAuth({
  // Configure one or more authentication providers

  // A secret to encrypt cookies (you should set your own secret!)
  secret: process.env.NEXTAUTH_SECRET,

  // Configure JWT options
  jwt: {
    secret: process.env.JWT_SECRET, // Secret used to verify JWT
  },

  // Optional SQL or MongoDB database to persist users
  //database: process.env.DATABASE_URL,
});
