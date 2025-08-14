// src/types/CustomRequest.ts
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}
