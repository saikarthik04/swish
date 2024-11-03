import { authOptions } from "@/app/utils/auth/authOptions";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

async function handler(req: CombineRequest, res: CombineResponse) {
  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };

