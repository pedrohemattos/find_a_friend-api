import { Request, Response } from "express";
import { PrismaOrganizationsRepository } from "../../../repositories/prisma/prisma-organizations-repository";
import { ListAllOrganizationUseCase } from "../../../use-cases/listAllOrganizations";
import { OrganizationNotFoundError } from "../../../use-cases/errors/organization-not-found-error";

export async function list(request: Request, response: Response) {
  try {
    const organizationsRepository = new PrismaOrganizationsRepository();
    const listAllOrganizationUseCase = new ListAllOrganizationUseCase(organizationsRepository);
    
    const { organizations } = await listAllOrganizationUseCase.execute();

    const organizationsWithoutPassword = organizations.map(org => {
      const { password_hash, ...orgWithoutPassword } = org;
      return orgWithoutPassword;
    });
  
    return response.status(200).send({
      organizations: organizationsWithoutPassword
    });
    
  } catch (error) {
    if(error instanceof OrganizationNotFoundError) {
      return response.status(404).send({ message: error.message });
    }

    throw error;
  };
};