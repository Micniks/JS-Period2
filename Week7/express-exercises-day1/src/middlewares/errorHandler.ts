import { Request, Response } from "express";
import { ApiError } from "../errors/apiError";

const endpointNotFound = function (
  req: Request,
  res: Response,
  next: Function
) {
  if (req.originalUrl.startsWith("/api")) {
    throw new ApiError("No endpoint located at: " + req.originalUrl, 404);
  }
  next();
};

const errorFormatter = function (
  err: Error,
  req: Request,
  res: Response,
  next: Function
) {
  if (err instanceof ApiError) {
    res
      .status(Number(err.errorCode))
      .json({ code: err.errorCode, message: err.message });
  }
  next(err);
};

export { endpointNotFound, errorFormatter };
