import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcryptjs";

const prismaDb = async (req: string) => {
  return await db.user.findUnique({
    where: {
      username: req,
    },
  });
};

const passwordMatchFunction = async (
  existingPassword: string,
  credentialsPassword: string,
) => {
  return await compare(existingPassword, credentialsPassword);
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;

        const existingUser = await prismaDb(credentials?.username);

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await passwordMatchFunction(
          credentials.password,
          existingUser.password,
        );

        if (!passwordMatch) {
          return null;
        }

        const {password, ...rest} = existingUser;
        return rest;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token,user);

      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        };
      }
      return token;
    },

    // @ts-ignore
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          name: token.name,
          role: token.role
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
  debug: process.env.NODE_ENV === "development"
});
