import { Router } from "express";
import { jwtCheck } from "../middlewares/jwtCheck";
import { roleCheck, roleCheckAdmin } from "../middlewares/roleCheck";
import {
  addPubs,
  getAllCommittees,
  committeeInfo,
  updateCommitteeInfo,
  committeeMembers,
  committeePubs,
  addSocialHandle,
  getSocialHandles,
  getSocialHandlesUser,
} from "../controllers/committeeControllers";

const router = Router();

router.post("/add/pubs", jwtCheck, roleCheckAdmin, addPubs);
router.get("/all", jwtCheck, getAllCommittees);
router.get("/info", jwtCheck, roleCheck, committeeInfo);
router.post("/update/info", jwtCheck, roleCheckAdmin, updateCommitteeInfo);
router.get("/pubs", jwtCheck, roleCheck, committeePubs);
router.get("/members", jwtCheck, roleCheck, committeeMembers);
router.post("/add/socialhandle", jwtCheck, roleCheck, addSocialHandle);
router.get("/socialhandles", jwtCheck, roleCheck, getSocialHandles);
router.get("/socialhandlesuser", jwtCheck, getSocialHandlesUser);

export default router;
