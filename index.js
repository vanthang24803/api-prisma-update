import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { testConnection } from "./lib/db.js";

import AuthRouter from "./router/auth.router.js";
import PostRouter from "./router/post.router.js";
import CommentRouter from "./router/comment.router.js";

config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

testConnection();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/api/auth", AuthRouter);
app.use("/api", PostRouter);
app.use("/api", CommentRouter);
