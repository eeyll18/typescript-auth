import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config";
import { Types } from "mongoose";

interface TokenPayload {
  userId: Types.ObjectId | string;
  roles: string[];
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, config.refreshTokenSecret) as TokenPayload;
  } catch (error) {
    return null;
  }
};
