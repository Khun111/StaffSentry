import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";

import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// References: next-auth official docs(authjs.dev), and a github issue(https://github.com/nextauthjs/next-auth/discussions/2197)
const prisma = new PrismaClient();

const prismaAdapter = PrismaAdapter(prisma);
prismaAdapter.createUser = (data) => {
  console.log("Data:", data);
  return prisma.user.create({data});
}
export const authOptions = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    callbacks: {
      session({ session, token, user }) {
        session.user = user ? user : token.user
        return session
      },
      async jwt({ token, user }) {
        if(user) token.user = user
        return Promise.resolve(token)
      },
    },
    adapter: prismaAdapter,
  };
  const handler = NextAuth(authOptions)
  export { handler as GET, handler as POST }