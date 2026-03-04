import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          return {
            id: credentials.email,
            email: credentials.email,
            accessToken: data.token,
            role: data.role,
          };
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            const messages: Record<number, string> = {
              400: "Invalid email or password format",
              401: "Incorrect email or password",
              403: "Access to this account is forbidden",
              404: "No account found with this email",
              422: "Invalid data provided",
              429: "Too many attempts. Please try again later",
              500: "Server error. Please try again later",
            };
            throw new Error(
              status && messages[status]
                ? messages[status]
                : "Something went wrong. Please try again later",
            );
          }
          throw new Error("Something went wrong. Please try again later");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
