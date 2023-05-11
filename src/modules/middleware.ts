import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  // here body middleware check if name is available in req and passes it throught req object itself
  // and validationResult checks in req if there is any error in it or not.
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};
