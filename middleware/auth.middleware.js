import jwt from "jsonwebtoken";
import { secret } from "../constant/index.js";

const authMiddleware = async (req, res, next) => {
  const token = (await req.cookies.token) || req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
