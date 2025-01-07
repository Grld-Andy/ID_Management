import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import User from "../models/UserModel";
import CustomError from "../utils/CustomError";
import ApiFeatures from "../utils/ApiFeatures";
import { Query } from "mongoose";
import filterUpdateRequestObj from "../utils/filterUpdateRequestBody";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const createUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);
    return res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export const getAllUsers = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new ApiFeatures(User.find(), req.query);
    const users: Array<User> = await features.query;
    const totalUsers: number = await User.countDocuments();

    return res.status(200).json({
      status: "success",
      data: {
        total: totalUsers,
        length: users.length,
        users,
      },
    });
  }
);

export const updateMe = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const filteredObj = filterUpdateRequestObj(req.body, "name", "phoneNumber");
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredObj,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedUser) {
      next(new CustomError("User not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
);

export const deleteMe = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedUser = await User.findByIdAndUpdate(req.user._id, {
      active: false,
    });

    if (!deletedUser) {
      next(new CustomError("User not found", 404));
    }

    return res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const recoverUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOneAndUpdate(
      {
        active: false,
        id: req.params.id,
      },
      { active: true }
    );
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);
