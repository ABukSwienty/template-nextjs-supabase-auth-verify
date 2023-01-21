import { getDBClient } from "@/util/backend/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const client = getDBClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        if (!credentials?.email || !credentials?.password) return null;

        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        if (!user.verified) return null;

        const isValid = bcrypt.compareSync(credentials.password, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        } as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
