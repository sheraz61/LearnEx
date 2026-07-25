import express from "express";

import { registerUser ,activateUser} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/registration", registerUser);
router.post("/activate-user", activateUser);

export default router;
