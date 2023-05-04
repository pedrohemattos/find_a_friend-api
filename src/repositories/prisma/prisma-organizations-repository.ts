import { Organization, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { OrganizationsRepository } from "../organizations-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async create(data: Prisma.OrganizationCreateInput) {
        const organization = await prisma.organization.create({
            data
        });

        return organization;
    };

    async findById(id: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                id
            }
        });

        return organization;
    }

    async findEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                email
            }
        });

        return organization;
    };

    async listAll() {
        const organizations = await prisma.organization.findMany();

        return organizations;
    }
};