import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  
  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    });
    
    return pet;
  }
  
  async listAll(city: string) {
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