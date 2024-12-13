import { PrismaClient } from "@prisma/client";
import { committeeInfoInterface } from "../interfaces/committeeInterfaces";

const prisma = new PrismaClient();

export async function createNewCommittee(cName: string) {
  const committee = await prisma.committee.findFirst({
    where: {
      committeeName: cName,
    },
  });

  if (committee) {
    return false;
  }

  return await prisma.committee.create({
    data: {
      nickName: cName,
      committeeName: cName,
      description: `This is ${cName} committee!`,
    },
  });
}

export async function limitHeads(roleId: number) {
  const headCount = await prisma.user.count({
    where: {
      roleId,
    },
  });

  if (headCount >= 2) {
    return false;
  } else {
    return true;
  }
}

export async function getCommitteeId(cNameFull: string) {
  const cName = cNameFull.split("_")[0];
  const committeeDetailes = await prisma.committee.findFirst({
    where: {
      nickName: cName,
    },
  });

  if (committeeDetailes) {
    return committeeDetailes.id;
  }
}

export async function checkUniquePubs(contact: string, committeeId: number) {
  return await prisma.publicity.findFirst({
    where: {
      contact,
      committeeId,
    },
  });
}

export async function addPubsToCommittee(
  details: { contact: string; name: string },
  committeeId: number,
) {
  return await prisma.publicity.create({
    data: {
      contact: details.contact,
      name: details.name,
      committeeId,
    },
  });
}

export async function insertSocialHandle(
  details: { platform: string; handle: string },
  committeeId: number,
) {
  return await prisma.committeeSocialHandle.create({
    data: {
      platform: details.platform,
      handle: details.handle,
      committeeId,
    },
  });
}

export async function getCommitteeNickName(id: number) {
  return await prisma.committee.findFirst({
    where: {
      id,
    },
  });
}

export async function getCommittees() {
  return await prisma.committee.findMany();
}

export async function getCommitteeInfo(nickName: string) {
  return await prisma.committee.findFirst({
    where: {
      nickName,
    },
  });
}

export async function updateCommitteeInfoService(
  id: number,
  info: committeeInfoInterface,
) {
  return await prisma.committee.update({
    where: {
      id,
    },
    data: {
      committeeName: info.committeeName,
      committeeLogo: info.committeeLogo,
      description: info.description,
    },
  });
}

export async function getPubsInfo(committeeId: number) {
  return await prisma.publicity.findMany({
    where: {
      committeeId,
    },
  });
}

export async function getCommitteeMembers(roleId: number) {
  return await prisma.user.findMany({
    where: {
      roleId,
    },
    include: {
      academicInfo: true,
      role: true,
    },
  });
}

export async function getSocialHandlesService(committeeId: number) {
  return await prisma.committeeSocialHandle.findMany({
    where: {
      committeeId,
    },
  });
}
