import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "../types/User";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    unique: [true, "Name has been used, please try a different name."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide your phone number"],
    validate: function (value: string) {
      if (!validator.isNumeric(value)) {
        throw new Error("Please enter the correct phone number");
      }
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const totalUsers = (await User.countDocuments) || 0;
  console.log(totalUsers)
  if (!totalUsers) {
    this.role = "admin";
  }
  this.password = await bcrypt.hash(this.password, 13);
  this.confirmPassword = "";
  next();
});

userSchema.methods.comparePasswords = async function (
  pass: string,
  passInDb: string
) {
  return await bcrypt.compare(pass, passInDb);
};

const User = mongoose.model<User>("User", userSchema);
export default User;
