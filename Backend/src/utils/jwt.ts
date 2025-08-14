// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import config from "../config/config";

export const verifyJwt = (token: string): any | null => {
  try {
    return jwt.verify(token, config.jwts.secret as string);
  } catch (error) {
    return null;
  }
};
