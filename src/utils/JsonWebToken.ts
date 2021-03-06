import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4, v5 } from "uuid";
import { Empresa } from "../entities";
import text_schema from "./configurations/textSchema";
import { Unauthorized } from "./errors/custom";

export const verify = (req: Request, res: Response, next: NextFunction): any => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) throw new Unauthorized(text_schema.ptbr.jwt.missingToken);

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
  jwt.verify(token, process.env.JWT_PASS, (failed, decoded) => {
    if (failed) throw new Unauthorized(text_schema.ptbr.jwt.invalidKey);
    decodedUser = decoded;
  });
  return decodedUser;
};

export const create = (
  params: {},
  time: string = process.env.JWT_EXPIRED_TIME,
  secret: string = process.env.JWT_PASS
) => {
  if (!params) throw new Error(text_schema.ptbr.jwt.missingParams);
  return jwt.sign(params, secret, {
    expiresIn: time,
  });
};

export const buildBody = (company: Empresa): any => {

  let tokenInfo = {
    id: company.id,
    responsavel: company.responsavel,
    cnpj: company.cnpj,
    telefone : company.telefone,
    email: company.email,
    nome : company.nome
  } 

  company["token"] = create(tokenInfo)
  return company;
};


export const gerarID = (nomeDoId: string) => {
  if (nomeDoId) {
    return v5(nomeDoId, v4()).replace("-", "")
  } else {
    return v5("GDC", v4()).replace("-", "")
  }
}