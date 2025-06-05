import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { z } from "zod";
import User, { IUser } from "../models/User";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = registerSchema.parse(req.body);
    const { roles } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    const user = await authService.registerUser(email, password, roles);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    if (error.message === "User already exists") {
      res.status(409).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const data = await authService.loginUser(email, password);

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Sadece HTTPS'te
      sameSite: "strict", // CSRF koruması için
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün 
    });

    res.json({
      accessToken: data.accessToken,
      user: data.user,
    });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: tokenFromCookie } = req.cookies;
    // const { refreshToken: tokenFromBody } = req.body;
    const token = tokenFromCookie;
    if (!token) {
      res.status(401).json({ message: "Refresh token not found" });
      return;
    }

    const data = await authService.refreshUserToken(token);
    res.json(data);
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: tokenFromCookie } = req.cookies;
    if (tokenFromCookie) {
      const user: IUser | null = await User.findOne({
        refreshToken: tokenFromCookie,
      }).exec();

      if (user && user._id) {
        await authService.logoutUser(user.id);
      }
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    next(error);
  }
};
