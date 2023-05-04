import { Pet } from "@prisma/client";
import { FilterQuery } from "../http/controllers/pets/filter";
import { PetsRepository } from "../repositories/pets-repository";
import { PetNotFoundError } from "./errors/pet-not-found-error";

interface FilterPetsUseCaseRequest {
  query: FilterQuery
};

interface FilterPetsUseCaseResponse {
  pets: Pet[]
};

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ query }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPets(query);

    if(!pets) {
      throw new PetNotFoundError();
    }
    
    return { pets };
  };
};