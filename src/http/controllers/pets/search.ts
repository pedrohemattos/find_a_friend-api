import { Request, Response } from "express";
import { z } from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../../../use-cases/searchPets";
import { PetNotFoundError } from "../../../use-cases/errors/pet-not-found-error";

export async function search(request: Request, response: Response) {
  const listAllParamsSchema = z.object({
    city: z.string({ required_error: "Informe a cidade." })
  })

  const { city } = listAllParamsSchema.parse(request.params);

  try {
    const petsRepository = new PrismaPetsRepository();
    const searchPetsUseCase = new SearchPetsUseCase(petsRepository);
  
    const { pets } = await searchPetsUseCase.execute({ city });

    return response.status(200).send({ pets });
  
  } catch (error) {
    if(error instanceof PetNotFoundError) {
      return response.status(404).send({ message: error.message })
    }

    throw error
  };
};