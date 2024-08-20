import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import  dbconnect  from '@lib/dbconnect';
import { UserModel } from '@models/user';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});


export const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            id: "credentials",  
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req): Promise<any> {
                try {
                  await dbconnect();
                  const user = await UserModel.findOne({
                    $or: [{ username: credentials.username }, { password: credentials.password }]
                  });
                  
                  if (!user) throw new Error("User not found");
              
                  const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
                  if (!isPasswordMatch) throw new Error("Invalid password");
              
                  if (!user.isVerified) throw new Error("Account not verified");
              
                  return user;
                } catch (err) {
                  console.error("Authorization error:", err);
                  throw new Error("Authorization failed");
                }
              },


        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;

            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

}