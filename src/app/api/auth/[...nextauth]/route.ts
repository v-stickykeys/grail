import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import EmailProvider from 'next-auth/providers/email';
 
// const client = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  // adapter: PrismaAdapter(client),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],

  callbacks: {
    jwt: async (payload: any) => {
      const { token } = payload;
      const user = payload.user;

      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token?.id,
          },
        };
      }
      return session;
    },
  },

  // debug: process.env.NODE_ENV === "developement",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
