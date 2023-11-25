import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controller/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/post", authMiddleware, createPost);
router.put("/post/:id", authMiddleware, updatePost);
router.delete("/post/:id", authMiddleware, deletePost);
router.get("/post/:id", getPostById);

export default router;
