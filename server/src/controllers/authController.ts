import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { createJwt } from "../util/Jwt";
import {
  SignupRequestBody,
  LoginRequestBody,
} from "../interfaces/authInterfaces";
import { getRoleByCode, getDefaultRole } from "../services/roleService";
import {
  createUser,
  findUserByEmail,
  findUserWithInfo,
  verifyAccount,
} from "../services/userService";
import { createNewCommittee, limitHeads } from "../services/committeeServices";
import { create } from "domain";
import encrypt from "../util/verificationToken";
import { sendVerificationEmail } from "../util/mail";
import decrypt from "../services/roleCodeService";

const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:5000/auth/google/callback";
const saltRounds = process.env.SALT_ROUND || 10;

export const getGoogleAuthUrl = (req: Request, res: Response) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
  res.json({ authUrl });
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  let roleDetails;
  let roleCode;
  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      },
    );
    const { access_token, refresh_token } = tokenResponse.data;

    const profileResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
    );
    const profile = profileResponse.data;
    roleDetails = await prisma.role.findFirst({
      where: {
        roleName: "User",
      },
    });
    if (roleDetails) {
      roleCode = roleDetails.roleCode;
    }

    let token = createJwt({ email: profile.email, roleCode: roleCode! });
    try {
      const user = await prisma.user.create({
        data: {
          name: profile.name,
          email: profile.email,
          roleId: roleDetails ? roleDetails.id : 2,
          refreshToken: refresh_token,
          verificationStatus: true,
          profilePic: profile.picture,
        },
      });

      res.status(200).send(`
							   <script>
								     window.opener.postMessage(${JSON.stringify({ status: 200, message: "New user, signing up!", token, academicInfo: false, verificationStatus: true, profilePic: profile.picture, feedBack: false })}, "*");
										     window.close();
												   </script>
													 `);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        const userInfo = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
          include: {
            academicInfo: true,
            feedBack: true,
            role: true
          },
        });


        if (userInfo?.role?.roleCode) {
          token = createJwt({ email: profile.email, roleCode: userInfo?.role?.roleCode });
        }

        const rollNo = userInfo?.academicInfo?.rollNo ? true : false;

        res.status(200).send(`
								   <script>
									     window.opener.postMessage(${JSON.stringify({ status: 200, message: "Existing user, logging in!", token, academicInfo: rollNo, verificationStatus: true, profilePic: userInfo?.profilePic, feedBack: userInfo?.feedBack })}, "*");
											     window.close();
													   </script>
														 `);
      }

      return;
    }
  } catch (error) {
    console.error("Error in OAuth:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export async function signup(
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, code } = req.body;
  try {
    const roleDetails = code
      ? await getRoleByCode(code)
      : await getDefaultRole();

    if (!roleDetails) {
      res.status(404).json({ message: "Invalid role code!" });
      return; // Exit the function if roleDetails is null
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "User already exisits!" });
      return;
    }
    const role = roleDetails.roleName;
    if (role === "User") {
      const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
      await createUser({
        name,
        email,
        password: hashedPassword,
        roleId: roleDetails.id,
      });
      //const verification = await encrypt(email);
      //const vMail = await sendVerificationEmail(email, verification.fullEncrypted);

      res
        .status(200)
        .json({ message: "User created  successfully!", academicInfo: false });
      return;
    } else {
      const cName = role.split("_")[0];
      const newCommittee = await createNewCommittee(cName);

      const limit = await limitHeads(roleDetails.id);

      if (limit) {
        const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
        await createUser({
          name,
          email,
          password: hashedPassword,
          roleId: roleDetails.id,
        });

        //const verification = await encrypt(email);
        //const vMail = await sendVerificationEmail(email, verification.fullEncrypted);

        res.status(200).json({
          message: "User created  successfully!",
          academicInfo: false,
        });
        return;
      } else {
        res.status(403).json({
          message:
            "Heads for this committee already exists. More than 2 heads for the same committee can not be created",
          academicInfo: false,
        });
        return;
      }
    }
  } catch (e) {
    console.error("Error signing up user!", e);
    next(e);
  }
}

export async function login(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;
  try {
    const user = await findUserWithInfo({
      email,
      academicInfo: true,
      role: true,
    });
    if (user) {
      if (user.password && (await bcrypt.compare(password, user.password))) {
        const rollNo = user?.academicInfo?.rollNo ? true : false;
        if (user.role && typeof user.role?.roleCode === "string") {
          const token = createJwt({ email, roleCode: user.role?.roleCode });
          if (!user.verificationStatus) {
            const verification = await encrypt(email);
            const vMail = await sendVerificationEmail(
              email,
              verification.fullEncrypted,
            );
          }
          res.status(200).json({
            message: "Logging in user!",
            token,
            academicInfo: rollNo,
            verificationStatus: user.verificationStatus,
            role: user?.role.roleName,
            profilePic: user?.profilePic,
            feedBack: user?.feedBack,
          });
          return;
        } else {
          res.status(400).json({ message: "Role code missing or invalid." });
          return;
        }
      } else {
        res.status(401).json({ message: "Incorrect password!" });
        return;
      }
    } else {
      res.status(404).json({ message: "User not found!" });
      return;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    next(error);
  }
}

export async function accountVerify(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { token } = req.query;
    if (!token) {
      res.status(403).json({ message: "Verificatin token is required!" });
      return;
    }

    const decryptedEmail = decrypt(token as string);

    const mailCheck = await findUserByEmail(decryptedEmail);

    if (mailCheck) {
      const verify = await verifyAccount(decryptedEmail);
      res.status(200).json({ mesage: "Account verified successfully!" });
      return;
    } else {
      res.status(404).json({ message: "Account not found!" });
      return;
    }
  } catch (error) {
    console.error("Error verifying account!", error);
    next(error);
  }
}

export async function resendVerificationMail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwtPayload } = req.body;
    const verification = await encrypt(jwtPayload.email);
    const vMail = await sendVerificationEmail(
      jwtPayload.email,
      verification.fullEncrypted,
    );
    if (vMail) {
      res.status(200).json({ message: "Verification mail sent successfully!" });
      return;
    }
  } catch (error) {
    console.error("Error resending verification mail!");
    next(error);
  }
}

export async function verificationStatusCheck(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwtPayload } = req.body;
    const user = await findUserWithInfo({
      email: jwtPayload.email,
      academicInfo: true,
      role: true,
    });

    if (user?.verificationStatus) {
      res.status(200).json({
        message: "Account verified!",
        verificationStatus: user.verificationStatus,
        role: user.role.roleName,
      });
      return;
    } else {
      res.json({ verificationSttaus: user?.verificationStatus });
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
