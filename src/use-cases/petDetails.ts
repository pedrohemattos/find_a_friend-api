import { PetsRepository } from "../repositories/pets-repository";
import { PetNotFoundError } from "./errors/pet-not-found-error";

interface PetDetailsUseCaseRequest {
  id: string
}

export class PetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: PetDetailsUseCaseRequest) {
    const petDetails = this.petsRepository.findById(id);

    if(!petDetails) {
      throw new PetNotFoundError();
    }

    return petDetails;
  }
}