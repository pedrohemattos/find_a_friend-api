import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { Request, Response } from "express";

export async function create(request: Request, response: Response) {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.number(),
    size: z.enum(["MINI", "P", "M", "G", "XG"]),
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    independency_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    photos: z.any().optional(),
    organization_id: z.string()
  });

  const { name, about, age, size, energy_level, independency_level, photos, organization_id } = createBodySchema.parse(request.body);

  await prisma.pet.create({
    data: {
      name,
      about,
      age, 
      size, 
      energy_level, 
      independency_level,
      photos, 
      organization_id
    }
  });
  
  return response.status(201).send();
}
