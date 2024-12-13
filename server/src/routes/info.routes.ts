import { Router } from "express";
import {
  infoInsert,
  getUserData,
  updateUserData,
  addFeedback,
  getFeedbacks,
} from "../controllers/info.controller";
import { jwtCheck } from "../middlewares/jwtCheck";

const router = Router();

router.post("/acadInfo", jwtCheck, infoInsert);
router.get("/profile", jwtCheck, getUserData);
router.post("/profile", jwtCheck, updateUserData);
router.post("/add/feedback", jwtCheck, addFeedback);
router.get("/feedbacks", getFeedbacks);

export default router;
