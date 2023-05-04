import { Request, Response } from "express";
import { z } from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { FilterPetsUseCase } from "../../../use-cases/filterPets";
import { PetNotFoundError } from "../../../use-cases/errors/pet-not-found-error";

const filterQuerySchema = z.object({
  animal: z.enum(["DOG", "CAT"]).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  age: z.string().optional(),
  size: z.enum(["MINI", "P", "M", "G", "XG"]).optional()
});

export type FilterQuery = z.infer<typeof filterQuerySchema>;

export async function filter(request: Request, response: Response) {
  try {
    const query = filterQuerySchema.parse(request.query);

    const petsRepository = new PrismaPetsRepository();
    const filterPetsUseCase = new FilterPetsUseCase(petsRepository);
  
    const { pets } = await filterPetsUseCase.execute({query});
    
    return response.status(200).send({ pets });

  } catch (error) {
    if(error instanceof PetNotFoundError) {
      return response.status(404).send({ message: error.message });
    }

    throw error;
  };
};