import { Request, Response } from "express";
import * as bycrypt from "bcrypt";
import { User } from "@prisma/client";

const jwt = require("jsonwebtoken");

export const comparePasswords = (password: string, hash: string) => {
  return bycrypt.compare(password, hash);
};
export const hashPassword = (password: string) => {
  return bycrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};
export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "No Token Bitch" });
    return;
  }
  const [, token] = bearer.split(" ");
  console.log(bearer);
  console.log(token);
  if (!token) {
    res.status(401);
    res.json({ message: "There is not token" });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json({ message: "WRong token" });
    return;
  }
};
