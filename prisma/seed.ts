import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

config();

const pool = new Pool();
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.book.create({ data: { name: "The Great Gatsby" } });
  await prisma.book.create({ data: { name: "To Kill a Mockingbird" } });
  const alice = await prisma.book.create({ data: { name: "Alice in Wonderland" } });
  const bob = await prisma.book.create({ data: { name: "Bob the Builder" } });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });