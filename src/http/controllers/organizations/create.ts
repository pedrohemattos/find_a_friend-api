import { Request, Response } from "express";
import { z } from "zod";
import { PrismaOrganizationsRepository } from "../../../repositories/prisma/prisma-organizations-repository";
import { CreateOrganizationUseCase } from "../../../use-cases/createOrganization";

export async function create(request: Request, response: Response) {
  const createBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      phone: z.string(),
      address: z.object({
        street: z.string(),
        zip_code: z.string(),
        city: z.string()
      })
  });

  const { name, email, phone, password, address } = createBodySchema.parse(request.body);

  // 1. Instanciar o repositório prisma das organizações
  // 2. Instanciar o caso de uso de criação das organizações
  // 3. Passar como parâmetro o repositório prisma para o caso de uso
  try {
    const organizationsRepository = new PrismaOrganizationsRepository();
    const createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepository);

    await createOrganizationUseCase.execute({
      name,
      email,
      phone,
      password,
      address
    });

  } catch (error) {
    return response.status(409).send(error);
  }

  return response.status(201).send();
};