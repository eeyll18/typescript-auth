import dotenv from "dotenv";
import { parseTime } from "../utils/timeConverter";

dotenv.config();

const defaultJwtExpiresInSeconds = 3600; // 1 saat
const defaultRefreshTokenExpiresInSeconds = 604800; // 7 gün

export const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || "",
  jwtSecret: (process.env.JWT_SECRET || "fallbacksecret") as string,
  jwtExpiresIn:
    parseTime(process.env.JWT_EXPIRES_IN || "1h") || defaultJwtExpiresInSeconds,
  refreshTokenSecret: (process.env.REFRESH_TOKEN_SECRET ||
    "fallbackrefreshsecret") as string,
  refreshTokenExpiresIn:
    parseTime(process.env.REFRESH_TOKEN_EXPIRES_IN || "7d") ||
    defaultRefreshTokenExpiresInSeconds,
};
