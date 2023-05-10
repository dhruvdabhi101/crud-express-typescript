import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { User } from "@prisma/client";

// creating user and sending JWT Token
export const createNewUser = async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req: any, res: any) => {
  const data = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (data !== null) {
    const isValid = await comparePasswords(req.body.password, data.password);
    if (!isValid) {
      res.status(401);
      res.json({ message: "Nope" });
      return;
    } else {
      res.status(200);
      const token = createJWT(data);
      res.json({ token });
      return;
    }
  } else {
    res.status(401);
    res.json({ message: "User doesn't exists" });
    return;
  }
};
