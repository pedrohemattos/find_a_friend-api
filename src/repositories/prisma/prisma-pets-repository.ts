import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";
import { FilterQuery } from "../../http/controllers/pets/filter";

export class PrismaPetsRepository implements PetsRepository {

  async filterPets(query: FilterQuery ) {
    
    const pets = await prisma.pet.findMany({
      where: {
        ...query
      }
    });

    return pets;
  };
  
  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    });
    
    return pet;
  };
  
  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city
      }
    });
    
    return pets;
  };

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            city: true,
            zip_code: true
          }
        }
      }
    });

    return pet;
  };
};