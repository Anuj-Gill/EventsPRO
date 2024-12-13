import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function getRoleByCode(code: string) {
  return prisma.role.findFirst({
    where: { roleCode: { endsWith: code } },
  });
}

export async function getDefaultRole() {
  return prisma.role.findFirst({
    where: { roleName: "User" },
  });
}

export async function getRoleIdMember(committeeNickName: string) {
  return prisma.role.findFirst({
    where: {
      roleName: `${committeeNickName}_Member`,
    },
  });
}

export async function getRoleIdHead(committeeNickName: string) {
  return prisma.role.findFirst({
    where: {
      roleName: `${committeeNickName}_Head`,
    },
  });
}
