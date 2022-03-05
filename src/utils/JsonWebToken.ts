import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import text_schema from "./aplication_config/textSchema";
import { UnauthorizedError } from "./errors/custom";

export const verify = (req: Request, res: Response, next: NextFunction): any => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) throw new UnauthorizedError(text_schema.ptbr.jwt.missingToken);

    req.header["company"] = decoded(token.toString());
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      body: {
        message: error.message,
      },
    });
  }
};

export const decoded = (token: string): {} => {
  let decodedUser: any;
  jwt.verify(token, process.env.jwtPassword, (failed, decoded) => {
    if (failed) throw new UnauthorizedError(text_schema.ptbr.jwt.invalidKey);
    decodedUser = decoded;
  });
  return decodedUser;
};

export const create = (
  params: {},
  time: string = process.env.jwtExpiredDefaultTime,
  secret: string = process.env.jwtPassword
) => {
  if (!params) throw new Error(text_schema.ptbr.jwt.missingParams);
  return jwt.sign(params, secret, {
    expiresIn: time,
  });
};

export const buildBody = (user): any => {
  user["token"] = create(user)
  return user;
};