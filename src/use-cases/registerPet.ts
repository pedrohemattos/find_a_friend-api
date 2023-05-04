import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { OrganizationNotFoundError } from "./errors/organization-not-found-error";

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  animal: "DOG" | "CAT"
  gender: "MALE" | "FEMALE"
  breed?: string
  age: string
  size: "MINI" | "P" | "M" | "G" | "XG"
  energy_level: "LOW" | "MEDIUM" | "HIGH"
  independency_level: "LOW" | "MEDIUM" | "HIGH"
  photo?: string
  city: string
  organization_id: string
};

interface RegisterPetUseCaseResponse {
  pet: Pet
};

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository, private organizationsRepository: OrganizationsRepository) {}

  async execute({ name, about, animal, gender, breed, age, size, energy_level, independency_level, photo, city, organization_id }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {

    const organization = await this.organizationsRepository.findById(organization_id);

    const pet = await this.petsRepository.register({
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
      organization_id,
    });

    return { pet };
  };
};