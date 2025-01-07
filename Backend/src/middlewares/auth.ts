import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import CustomError from "../utils/CustomError";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

const auth = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next(new CustomError("You are not logged in", 401));
      return;
    }
    const token = authHeader.split(" ")[1];
    const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET as string;

    const decodedToken = jwt.verify(token, accessTokenSecret) as { id: string };
    const user = await User.findById(decodedToken.id).select("+active");
    if (!user) {
      next(new CustomError("User with the given id does not exist", 404));
      return;
    }
    if (!user.active) {
      next(new CustomError("The user with this account is deleted", 400));
      return;
    }

    req.user = user;
    next();
  }
);

export default auth;
