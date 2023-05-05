import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { env } from "../../../env";

export async function refresh(request: Request, response: Response) {
  let refreshToken;

  if(request.cookies?.refreshToken) {
    refreshToken = request.cookies.refreshToken;
  }

  try {
    const data = jwt.verify(refreshToken, env.JWT_SECRET);

    const token = jwt.sign(
      {},
      env.JWT_SECRET,
      {
        subject: data.sub?.toString(),
        expiresIn: '10m'
      }
    )

    refreshToken = jwt.sign(
      {},
      env.JWT_SECRET,
      {
        subject: data.sub?.toString(),
        expiresIn: '7d'
      }
    );

    return response
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: true,
    })
    .status(200)
    .send({
      token
    }); 
  } catch (error) {
    return response.status(401).send({ message: "Invalid Token" });
  }
};