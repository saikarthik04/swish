import {createUser, GetUserByEmail} from "@/app/api/users/users";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
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
      async signIn({user}) {
        try {
          const token:JWT ={
            email : user.email,
            name : user.name,
            picture : user.image
          }
        await createUser(token)

        }catch(err){
          console.error("Error in createUser during signIn callback:", err);
          return false;
        }
        return true
      },
    }
}

