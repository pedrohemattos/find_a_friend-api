import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
    public items: Organization[] = [];

    async create(data: Prisma.OrganizationCreateInput) {
        const organization = Object.assign({
            ...data, 
            id: '123'
        })

        this.items.push(organization);

        return organization;
    }

    async findEmail(email: string) {
        const organization = this.items.find(organization => organization.email === email);

        if(!organization) return null;

        return organization;
    }

}