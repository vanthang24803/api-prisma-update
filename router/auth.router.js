import express from "express";
import {
  getAllUsers,
  signIn,
  updatePassword,
  updateUser,
} from "../controller/auth.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/sigin", signIn);
router.put("/:id", updateUser);
router.put("/password/:username", updatePassword);

export default router;
