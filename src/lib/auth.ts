import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const demoEmail = process.env.DEMO_USER_EMAIL ?? "demo@example.com";
const demoPassword = process.env.DEMO_USER_PASSWORD ?? "pass1234";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        if (parsed.data.email !== demoEmail || parsed.data.password !== demoPassword) {
          return null;
        }

        return {
          id: "demo-user",
          email: demoEmail,
          name: "Demo User"
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }
      return session;
    }
  }
};

export async function auth() {
  return getServerSession(authOptions);
}
