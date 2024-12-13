import randomstring from "randomstring";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateTeamCode() {
  let code: string;
  let existingTeamCode;

  do {
    code = randomstring.generate(10);
    existingTeamCode = await prisma.participant.findFirst({
      where: {
        teamCode: code,
      },
    });
  } while (existingTeamCode);

  return code;
}
