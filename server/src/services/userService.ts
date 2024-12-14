import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  roleId: number;
}) {
  return prisma.user.create({
    data,
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      academicInfo: true,
    },
  });
}

export async function findUserWithInfo(data: {
  email: string;
  academicInfo: boolean;
  role: boolean;
}) {
  return prisma.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      academicInfo: data.academicInfo,
      role: data.role,
      feedBack: true,
    },
  });
}

export async function addAcademicInfo(data: {
  rollNo: string;
  department: string;
  year: number;
  division: string;
  email: string;
}) {
  return prisma.academicInfo.create({
    data: {
      rollNo: data.rollNo,
      department: data.department,
      year: data.year,
      division: data.division,
      user: {
        connect: {
          email: data.email,
        },
      },
    },
  });
}

export async function verifyAccount(email: string) {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      verificationStatus: true,
    },
  });
}

export async function updateUserDataService(email: string, details: any) {
  const name = details.name;
  const gender = details.gender;
  const profilePic = details.profilePic;
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
      gender,
      profilePic,
    },
  });
  const rollNo = details.academicInfo.rollNo;
  const department = details.academicInfo.department;
  const year = details.academicInfo.year;
  const division = details.academicInfo.division;
  const userId = user.id;
  const acadInfo = await prisma.academicInfo.update({
    where: {
      userId,
    },
    data: {
      rollNo,
      department,
      year,
      division,
    },
  });
  if (acadInfo) {
    return true;
  }
  return false;
}

export async function addFeedbackService(
  email: string,
  details: {
    rating: number;
    comment: string;
  },
) {
  return prisma.feedBack.create({
    data: {
      rating: details.rating,
      comment: details.comment,
      status: true,
      user: {
        connect: {
          email,
        },
      },
    },
  });
}

export async function getFeedbacksService() {
  return await prisma.feedBack.findMany({
    where: {
      rating: {
        gte: 4,
      },
    },
    include: {
      user: true,
    },
  });
}


export async function getUserStatsService(userId: number) {
  return await prisma.participant.findMany({
    where: {
      userId
    },
    include: {
      user: true,
      event: true
    },
  });
}
