import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../../../lib/middlewares/mongodb";
import { verifyPassword } from "../../../lib/middlewares/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
        role: { label: "role", type: "text" },
      },
      async authorize(credentials) {
        try {
          const client = await connectToDatabase();
          const users = credentials?.role === "user" ? client.db().collection("users") : client.db().collection("admin");
          const user = await users.findOne({
            userName: credentials?.username,
          });
          if (!user) {
            client.close();
            throw new Error("Email and/or Password not found");
          }
          const passwordValid = await verifyPassword(credentials!.password, user.password);
          if (!passwordValid) {
            client.close();
            throw new Error("Email and/or Password not found");
          } else {
            client.close();
            return {
              id: user._id.toString(),
              name: user.userName,
              email: user.email,
              role: user.role,
            };
          }
        } catch (e: any) {
          throw Error(e.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.role = token.role;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/user/userLogin",
  },
});
