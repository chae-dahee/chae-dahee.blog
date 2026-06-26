import { PrismaClient } from "@prisma/client";

// 개발 중 핫리로드로 연결이 폭증하는 것을 막는 싱글톤 패턴
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
