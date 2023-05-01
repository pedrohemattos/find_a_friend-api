import { Prisma, Organization } from "@prisma/client";

export interface OrganizationsRepository {
    create(data: Prisma.OrganizationCreateInput): Promise<Organization>
    findEmail(email: string): Promise<Organization | null>
}