import { Request, Response, NextFunction } from "express";

const myLogger = function (req: Request, res: Response, next: NextFunction) {
  console.log("Time:", Date());
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  next();
};

export { myLogger };
