import { Pet, Prisma } from "@prisma/client";

import { FilterQuery } from "../http/controllers/pets/filter";

export interface PetsRepository {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(city: string): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  filterPets(query: FilterQuery): Promise<Pet[] | null>
}