import NextAuth from "next-auth";
import { cache } from "react";
import { db } from "~/server/prisma";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };

async function main() {
  // ... you will write your Prisma Client queries here
}

const prisma = db;

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  
  