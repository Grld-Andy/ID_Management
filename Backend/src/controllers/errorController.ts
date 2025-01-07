import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
};

const devErrors = (res: Response, error: any) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodErrors = (res: Response, error: any) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong, please try again later.",
    });
  }
};

const handleValidationErrors = (err: any) => {
  const errors = Object.values(err.errors).map((e: any) => e.message);
  const errorMessage = errors.join(". ");
  const msg = `Invalid input data: ${errorMessage}`;
  return new CustomError(msg, 400);
};

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV == "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV == "production") {
    if (error.name === "ValidationError") handleValidationErrors(error);
    prodErrors(res, error);
  }
};

export default globalErrorHandler;
