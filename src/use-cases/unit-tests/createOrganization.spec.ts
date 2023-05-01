import { compare } from "bcryptjs";
import { InMemoryOrganizationsRepository } from "../../repositories/in-memory/in-memory-organizations-repository"
import { CreateOrganizationUseCase } from "../createOrganization";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let createOrganizationUseCase: CreateOrganizationUseCase;

describe('Create Organization Use Case', () => {
    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository();
        createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepository);
    })

    it('should be able to create an organization', async () => {
        const { organization } = await createOrganizationUseCase.execute({
            name: 'Organização Vira-Lata Caramelo',
            email: 'caramelo@email.com',
            password: '123456',
            phone: '9999',
            address: {
                city: 'Florianópolis',
                street: 'Rua do Caramelo',
                zip_code: '8888'
            }
        });

        expect(organization.id).toEqual(expect.any(String));
    });

    it('should hash organization password upon creation', async () => {
        const { organization } = await createOrganizationUseCase.execute({
            name: 'Organização Vira-Lata Caramelo',
            email: 'caramelo@email.com',
            password: '123456',
            phone: '9999',
            address: {
                city: 'Florianópolis',
                street: 'Rua do Caramelo',
                zip_code: '8888'
            }
        });

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            organization.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to create an organization with an already existing e-mail', async () => {
        await createOrganizationUseCase.execute({
            name: 'Organização Vira-Lata Caramelo',
            email: 'caramelo@email.com',
            password: '123456',
            phone: '9999',
            address: {
                city: 'Florianópolis',
                street: 'Rua do Caramelo',
                zip_code: '8888'
            }
        });

        expect(() =>
            createOrganizationUseCase.execute({
                name: 'Organização Vira-Lata Caramelo',
                email: 'caramelo@email.com',
                password: '123456',
                phone: '9999',
                address: {
                    city: 'Florianópolis',
                    street: 'Rua do Caramelo',
                    zip_code: '8888'
                }
            }) 
        ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
    });
})

