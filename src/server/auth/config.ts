import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbAuth } from "~/server/prisma-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        const user = await dbAuth.user.findFirst({
          where: { login: credentials.login as string },
        });

        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!valid) return null;

        return { id: user.id, login: user.login, email: user.email };
      },
    }),
  ],
  adapter: PrismaAdapter(dbAuth),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && profile?.name && token.email) {
        await dbAuth.user.updateMany({
          where: { email: token.email, login: null },
          data: { login: profile.name as string },
        });
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;