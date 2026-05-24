import "server-only";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "~/env"; // Используем тильду, как в вашем конфиге

// 1. Создаем функцию-инициализатор
const createPrismaClient = () => {
  const pool = new Pool({ connectionString: env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

// 2. Настройка для предотвращения множественных подключений в режиме разработки
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// 3. КРИТИЧЕСКИ ВАЖНО: Добавь export перед const db
export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;