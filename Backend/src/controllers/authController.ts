import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import User from "../models/UserModel";
import CustomError from "../utils/CustomError";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN } from "../constants/auth";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const sendResponse = (res: Response, user: User) => {
  const token = signToken(user._id);
  let options = {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.cookie("jwt", token, options);

  user.password = "";
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    if (!name || !password) {
      next(new CustomError("Please enter your name and password", 400));
    }
    const user = await User.findOne({ name }).select("+password");
    if (!user) {
      next(
        new CustomError(
          "User with entered name not found, please try again",
          400
        )
      );
      return;
    }

    if (!(await user.comparePasswords(password, user.password))) {
      next(new CustomError("The password you entered is invalid", 401));
      return;
    }

    sendResponse(res, user);
  }
);

export const logout = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  }
);

// TODO : forgot password
export const forgotPassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

// TODO : reset password
export const resetPassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updatePassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return next(new CustomError("Passwords do not match", 400));
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user || !user.comparePasswords(currentPassword, user.password)) {
      return next(
        new CustomError("The current password provided is not correct", 400)
      );
    }

    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    await user.save();

    sendResponse(res, user);
  }
);
