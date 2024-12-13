// src/routes/authRoutes.ts
import { Router } from "express";
import {
  getGoogleAuthUrl,
  googleAuthCallback,
  signup,
  login,
  accountVerify,
  resendVerificationMail,
  verificationStatusCheck,
} from "../controllers/authController";
import { jwtCheck } from "../middlewares/jwtCheck";

const router = Router();

// Endpoint to get Google auth URL
router.get("/google/url", getGoogleAuthUrl);

// Callback endpoint for Google OAuth
router.get("/google/callback", googleAuthCallback);

// Endpoint for normal signup
router.post("/signup", signup);

router.post("/login", login);

router.get("/verify", accountVerify);

router.get("/resend", jwtCheck, resendVerificationMail);

router.get("/verify/status", jwtCheck, verificationStatusCheck);

export default router;
