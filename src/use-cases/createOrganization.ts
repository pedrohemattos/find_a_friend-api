import { hash } from "bcryptjs";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import { Organization } from "@prisma/client";

interface CreateOrganizationUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  zip_code: string
  city: string
};

interface CreateOrganizationUseCaseResponse {
  organization: Organization
};

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ name, email, password, phone, zip_code, city }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {

    const password_hash = await hash(password, 6);

    const organizationWithSameEmail = await this.organizationsRepository.findEmail(email);

    if(organizationWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      phone,
      zip_code,
      city
    });

    return { organization };
  }
}
