import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";

const restrict = (...role: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !role.includes(req.user.role)) {
      next(
        new CustomError(
          "You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};

export default restrict;
