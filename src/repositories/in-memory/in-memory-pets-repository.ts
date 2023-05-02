import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  
  private items: Pet[] = [];
  
  register(data: Prisma.PetUncheckedCreateInput) {
    const pet = Object.assign({
      ...data,
      id: 'id-pet'
    });
    
    this.items.push(pet);
    
    return pet;
  };
  
  async listAll(city: string) {
    const pets  = this.items.filter(pet => pet.city === city);
    
    return pets;
  };

  async findById(id: string) {
    const pet = this.items.find(pet => pet.id === id);

    if(!pet) {
      return null;
    }

    console.log(pet)
    return pet;
  }
  
}