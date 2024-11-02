import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = { 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60,       
    },
    jwt: {
      maxAge: 24 * 60 * 60,  
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
      async jwt({token}) {
        return token
      }
    }
}
type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

async function handler(req: CombineRequest, res: CombineResponse) {
  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };

