import express from "express";
import { Register, bookticket, getuser, login } from "../controller/user.js";
import { createEvent, getevents } from "../controller/event.js";

const router = express.Router();

router.post("/auth/register", Register);
router.post("/auth/login", login);
router.post("/createevent", createEvent);
router.get("/getevents", getevents);
router.get("/auth/:userid", getuser);
router.put("/auth/:userid", bookticket);
export default router;
