import { Request, Response } from "express";
import { z } from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../../../use-cases/registerPet";
import { PrismaOrganizationsRepository } from "../../../repositories/prisma/prisma-organizations-repository";

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
  });

  try {
    const { name, about, animal, gender, breed, age, size, energy_level, independency_level, photo } = createBodySchema.parse(request.body);
    
    const petsRepository = new PrismaPetsRepository();
    const organizationsRepository = new PrismaOrganizationsRepository();
    const registerPetUseCase = new RegisterPetUseCase(petsRepository, organizationsRepository);

    const organization_id = request.sub;
  
    const organization = await organizationsRepository.findById(organization_id);
    
    if(!organization) {
      return response.status(404).send({ message: "Organization not found." })
    }

    const city = organization.city;
    
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
