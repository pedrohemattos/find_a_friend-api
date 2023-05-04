import { Request, Response } from "express";
import { z } from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { PetDetailsUseCase } from "../../../use-cases/petDetails";
import { PetNotFoundError } from "../../../use-cases/errors/pet-not-found-error";

export async function details(request: Request, response: Response) {
  const detailsParamsSchema = z.object({
    id: z.string()
  });

  try {
    const { id } = detailsParamsSchema.parse(request.params);
    
    const petsRepository = new PrismaPetsRepository();
    const petDetailsUseCase = new PetDetailsUseCase(petsRepository);

    const { pet } = await petDetailsUseCase.execute({ id });

    return response.status(200).send({ pet });

  } catch (error) {
    if(error instanceof PetNotFoundError) {
      return response.status(404).send({ message: error.message });
    }

    throw error;
  };
};