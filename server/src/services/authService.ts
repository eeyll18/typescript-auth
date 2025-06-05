import { Types } from "mongoose";
import User, { IUser } from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtHelper";
import { hashPassword, comparePassword } from "../utils/passwordHelper";

export const registerUser = async (
  email: string,
  password: string,
  roles: string[] = ["user"]
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exist");
  }
  const passwordHash = await hashPassword(password);
  const user = new User({ email, passwordHash, roles });
  await user.save();
  return {
    _id: user._id,
    email: user.email,
    roles: user.roles,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const tokenPayload = {
    userId: user.id,
    roles: user.roles,
    email: user.email,
  };

  console.log(
    "Payload to be signed for Access Token:",
    JSON.stringify(tokenPayload, null, 2)
  );

  const accessToken = generateAccessToken(tokenPayload);
  const refreshTokenPayload = {
    userId: user.id,
    roles: user.roles,
    email: user.email, 
  };


  const refreshToken = generateRefreshToken(refreshTokenPayload);
  // const refreshToken = generateRefreshToken(tokenPayload);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      roles: user.roles,
      email: user.email,
    },
  };
};

export const refreshUserToken = async (token: string) => {
  const user = await User.findOne({ refreshToken: token });
  if (!user) throw new Error("Invalid refresh token");

  
  try {
    const decoded = verifyRefreshToken(token); 
    if (!decoded || decoded.userId.toString() !== user.id.toString()) {
      throw new Error("Invalid or expired refresh token");
    }
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    roles: user.roles,
  };
  const newAccessToken = generateAccessToken(tokenPayload);
  
  const newRefreshToken = generateRefreshToken(tokenPayload);
  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      _id: user._id,
      email: user.email,
      roles: user.roles,
    },
  };
};

export const logoutUser = async (userId: Types.ObjectId | string) => {
  //  $unset, belirtilen alanı kaldırır
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
};
