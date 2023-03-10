import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/app.types";

const SECRET = process.env.SECRET as Secret;

export const getUserToken = (user: User | null) => {
  const token = jwt.sign({ user }, SECRET);
  return token;
};

export const getAuthHeader = (
  req: Request,
  res: Response,
  next: NextFunction
): void | boolean => {
  if (!req.headers.authorization) {
    res.status(401).send("Authorization token is missing");
    return false;
  }
  try {
    const token = req.headers.authorization
    console.log(req.headers);
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(401).send({
      message: `error occured checking Authorization token`,
      error: error,
    });
    return false;
  }
};
