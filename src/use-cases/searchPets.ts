import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { PetNotFoundError } from "./errors/pet-not-found-error";

interface SearchPetsUseCaseRequest {
  city: string
};

interface SearchPetsUseCaseResponse {
  pets: Pet[]
};

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(city);
    
    if(!pets) {
      throw new PetNotFoundError();
    }

    return { pets };
  };

};