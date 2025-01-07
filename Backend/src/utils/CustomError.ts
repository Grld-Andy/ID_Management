class CustomError extends Error {
  status: string;
  isOperational: boolean;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
