import { Request, Response } from "express";
import { z } from "zod";
import { PrismaOrganizationsRepository } from "../../../repositories/prisma/prisma-organizations-repository";
import { AuthenticateUseCase } from "../../../use-cases/authenticate";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error";

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const organizationsRepository = new PrismaOrganizationsRepository();
    const authenticateUseCase = new AuthenticateUseCase(organizationsRepository);

    await authenticateUseCase.execute({
      email,
      password
    });

    return response.status(200).send();
  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return response.status(401).send({ message: error.message });
    }

    throw error;
  };
};