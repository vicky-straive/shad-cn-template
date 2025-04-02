import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Import your prisma client here
// import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Uncomment when you add a database
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your own logic here to find the user from credentials
        // This is a placeholder - implement actual auth logic when adding a database
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = user;

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role || "user";
      }
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
