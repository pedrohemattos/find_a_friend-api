import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { FilterQuery } from "../../http/controllers/pets/filter";

export class InMemoryPetsRepository implements PetsRepository {
  
  private items: Pet[] = [];
  
  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet = Object.assign({
      ...data,
      id: 'id-pet'
    });
    
    this.items.push(pet);
    
    return pet;
  };
  
  async findByCity(city: string) {
    const pets  = this.items.filter(pet => pet.city === city);
    
    if(!pets) {
      return null;
    }

    return pets;
  };

  async findById(id: string) {
    const pet = this.items.find(pet => pet.id === id);

    if(!pet) {
      return null;
    }

    return pet;
  };

  async filterPets(query: FilterQuery) {
    const filteredPets = this.items.filter(
      (pet) => {
        return (!query.animal || pet.animal === query?.animal) &&
        (!query.gender || pet.gender === query?.gender) &&
        (!query.size || pet.size === query?.size) &&
        (!query.age || pet.age === query?.age)
      }
    );

    return filteredPets;
  };
  
};