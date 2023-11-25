import express from "express";
import { config } from "dotenv";


import cookieParser from "cookie-parser";
import { testConnection } from "./db/db.js";

import AuthRouter from "./router/auth.router.js";

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
