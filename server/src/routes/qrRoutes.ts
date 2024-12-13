import { Router } from "express";
import { roleCheckCommittee } from "../middlewares/roleCheck";
import { attendance, mark } from "../controllers/qrController";
import { jwtCheck } from "../middlewares/jwtCheck";

const router = Router();

router.post("/verify", jwtCheck, roleCheckCommittee, attendance);
router.post("/attendance", jwtCheck, roleCheckCommittee, mark);

export default router;
