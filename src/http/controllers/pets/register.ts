import { Request, Response } from "express";
import { z } from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../../../use-cases/registerPet";

export async function register(request: Request, response: Response) {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    animal: z.enum(["DOG", "CAT"]),
    gender: z.enum(["MALE", "FEMALE"]),
    breed: z.string().optional().default("Não informado."),
    age: z.string(),
    size: z.enum(["MINI", "P", "M", "G", "XG"]),
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    independency_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    photo: z.string().optional().default("Não informado."),
    city: z.string(),
    organization_id: z.string()
  });

  const { name, about, animal, gender, breed, age, size, energy_level, independency_level, photo, city, organization_id } = createBodySchema.parse(request.body);

  try {
    const petsRepository = new PrismaPetsRepository();
    const registerPetUseCase = new RegisterPetUseCase(petsRepository);

    await registerPetUseCase.execute({
      name,
      about,
      animal,
      gender,
      breed,
      age, 
      size, 
      energy_level, 
      independency_level,
      photo, 
      city,
      organization_id
    });
  } catch (error) {
    return response.status(409).send(error);
  }
  
  return response.status(201).send();
}
