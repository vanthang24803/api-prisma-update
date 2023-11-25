import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
} from "../controller/comment.controller.js";

const router = express.Router();

router.post("/post/:postId/comment", authMiddleware, createComment);
router.get("/post/:postId/comments", getAllComment);
router.put("/post/:postId/comment/:commentId", updateComment);
router.delete("/post/:postId/comment/:commentId", deleteComment);

export default router;
