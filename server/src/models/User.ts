import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  roles: string[];
  refreshToken?: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ["user"] },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

// instance method - interfacede tanımlanan method
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model<IUser>("User", UserSchema);
