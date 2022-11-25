import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { prisma } from "../../../util/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.MY_GITHUB_ID,
      clientSecret: process.env.MY_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.userId = user.id
      session.isAdmin = user.isAdmin
      return Promise.resolve(session)
    },
  },
}

export default NextAuth(authOptions)
