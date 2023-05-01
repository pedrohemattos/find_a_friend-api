import { hash } from "bcryptjs";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";

interface createOrganizationProps {
  name: string
  email: string
  password: string
  phone: string
  address: {
    city: string,
    street: string,
    zip_code: string
  }
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ name, email, password, phone, address }: createOrganizationProps) {

    const password_hash = await hash(password, 6);

    const organizationWithSameEmail = await this.organizationsRepository.findEmail(email)

    if(organizationWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      phone,
      address: {
        create: {
          city: address.city,
          street: address.street,
          zip_code: address.zip_code
        }
      }
    });

    return {organization}
  }
}
