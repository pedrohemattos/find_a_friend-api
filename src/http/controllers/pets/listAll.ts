import { prisma } from "../../../lib/prisma";
import { Request, Response } from "express";

export async function listAll(request: Request, response: Response) {
  const pets = await prisma.pet.findMany({
    include: {
      organization: true
    }
  });

  return response.status(200).send({
    pets
  });
};