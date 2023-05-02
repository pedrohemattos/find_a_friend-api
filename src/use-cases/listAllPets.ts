import { PetsRepository } from "../repositories/pets-repository";

interface ListAllPetsUseCaseRequest {
  city: string
};

export class ListAllPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: ListAllPetsUseCaseRequest) {
    const pets = await this.petsRepository.listAll(city);
    
    return pets;
  };

};