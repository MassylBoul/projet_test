/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { AuthOptions } from "@/app/components/AuthObject/AuthOption";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
