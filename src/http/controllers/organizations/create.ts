import { Request, Response } from "express";
import { z } from "zod";
import { PrismaOrganizationsRepository } from "../../../repositories/prisma/prisma-organizations-repository";
import { CreateOrganizationUseCase } from "../../../use-cases/createOrganization";
import { FindCityByCep } from "../location/find-city-and-state-by-cep";
import { EmailAlreadyExistsError } from "../../../use-cases/errors/email-already-exists-error";
import { AddressNotFoundError } from "../../../use-cases/errors/address-not-found-error";

export async function create(request: Request, response: Response) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    zip_code: z.string().trim().length(8),
    city: z.string()
  });

  try {
    const { name, email, phone, password, zip_code, city } = createBodySchema.parse(request.body);

    // let { city } = await FindCityByCep(zip_code);

    const organizationsRepository = new PrismaOrganizationsRepository();
    const createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepository);

    await createOrganizationUseCase.execute({
      name,
      email,
      phone,
      password,
      zip_code,
      city
    });
    
    return response.status(201).send();

  } catch (error) {
    if(error instanceof EmailAlreadyExistsError) {
      return response.status(409).send({ message: error.message });
    }
    
    throw error;
  };

};