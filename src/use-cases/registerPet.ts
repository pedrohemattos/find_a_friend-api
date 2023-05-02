import { PetsRepository } from "../repositories/pets-repository"

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
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ name, about, animal, gender, breed, age, size, energy_level, independency_level, photo, city, organization_id }: RegisterPetUseCaseRequest) {

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
  }
}