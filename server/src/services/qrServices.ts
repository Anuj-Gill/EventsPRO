import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function markUserAttendance(token: string) {
  return await prisma.participant.update({
    where: { qrCodeToken: token },
    data: { hasAttended: true },
  });
}
