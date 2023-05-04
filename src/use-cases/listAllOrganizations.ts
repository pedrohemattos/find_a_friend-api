import { OrganizationsRepository } from "../repositories/organizations-repository";
import { Organization } from "@prisma/client";
import { OrganizationNotFoundError } from "./errors/organization-not-found-error";

interface ListAllOrganizationUseCaseResponse {
  organizations: Organization[]
};

export class ListAllOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(): Promise<ListAllOrganizationUseCaseResponse> {

    const organizations = await this.organizationsRepository.listAll();

    if(!organizations) {
      throw new OrganizationNotFoundError();
    }

    return { organizations };
  }
}
