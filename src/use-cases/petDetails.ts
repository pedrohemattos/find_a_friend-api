import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { PetNotFoundError } from "./errors/pet-not-found-error";

interface PetDetailsUseCaseRequest {
  id: string
};

interface PetDetailsUseCaseReponse {
  pet: Pet
};

export class PetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: PetDetailsUseCaseRequest): Promise<PetDetailsUseCaseReponse> {
    const pet = await this.petsRepository.findById(id);

    if(!pet) {
      throw new PetNotFoundError();
    }

    return { pet };
  }
}