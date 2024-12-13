import { Router } from "express";
import { jwtCheck } from "../middlewares/jwtCheck";
import { roleCheck, roleCheckAdmin } from "../middlewares/roleCheck";
import {
  createEvent,
  register,
  registerTeam,
  upcomingEvents,
  committeeEvents,
  eventDetails,
  checkRegistered,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getEventParticipants,
} from "../controllers/eventController";
const router = Router();

router.post("/create", jwtCheck, roleCheckAdmin, createEvent);
router.post("/update", jwtCheck, roleCheckAdmin, updateEvent);
router.delete("/delete", jwtCheck, roleCheckAdmin, deleteEvent);
router.post("/register", jwtCheck, register);
router.post("/registerTeam", jwtCheck, registerTeam);
router.get("/upcoming", jwtCheck, upcomingEvents);
router.post("/bycommittee", jwtCheck, committeeEvents);
router.get("/all", jwtCheck, getAllEvents);
router.post("/details", eventDetails);
router.post("/check/registered", jwtCheck, checkRegistered);
router.get("/participants", jwtCheck, roleCheck, getEventParticipants);

export default router;
