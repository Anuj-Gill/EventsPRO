import QRCode from "qrcode";
import randomstring from "randomstring";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const frontendUrl = process.env.FRONTEND_URL;

export async function generateQRCode(token: string) {
  return await QRCode.toDataURL(
    `${frontendUrl}/attendance/verify?token=${token}`,
  );
}

export async function generateQrCodeToken() {
  let code: string;
  let existingTeamCode;

  do {
    code = randomstring.generate(7);
    existingTeamCode = await prisma.participant.findFirst({
      where: {
        qrCodeToken: code,
      },
    });
  } while (existingTeamCode);

  return code;
}
