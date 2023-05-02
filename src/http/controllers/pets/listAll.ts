import { Request, Response } from "express";
import { z } from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { ListAllPetsUseCase } from "../../../use-cases/listAllPets";

export async function listAll(request: Request, response: Response) {
  const listAllParamsSchema = z.object({
    city: z.string({ required_error: "Informe a cidade." })
  })

  const { city } = listAllParamsSchema.parse(request.params);

  const petsRepository = new PrismaPetsRepository();
  const listAllPetsUseCase = new ListAllPetsUseCase(petsRepository);

  const { pets } = await listAllPetsUseCase.execute({ city });
  
  return response.status(200).send(pets);
};