import express from "express";
import {
  getAllUsers,
  signUp,
  signIn,
  updatePassword,
  updateUser,
  logOut,
} from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/update", authMiddleware, updateUser);
router.put("/password", authMiddleware, updatePassword);
router.post("/logout", authMiddleware, logOut);

export default router;
