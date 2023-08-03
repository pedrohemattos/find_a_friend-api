import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { env } from "../../env";

export function verifyJWT(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if(!authorization) {
    return response.status(401).send({ message: "No Token Provided" });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, env.JWT_SECRET);
    console.log(data)

    const { sub } = data;
    //TODO: corrigir esse erro de ts:
    request.sub = sub;

    return next();
  } catch {
    return response.status(401).send({ message: "Invalid Token" });
  };
};