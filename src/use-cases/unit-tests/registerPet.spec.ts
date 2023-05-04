import { InMemoryOrganizationsRepository } from "../../repositories/in-memory/in-memory-organizations-repository";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { CreateOrganizationUseCase } from "../createOrganization";
import { RegisterPetUseCase } from "../registerPet";

let petsRepository: InMemoryPetsRepository;
let registerPetUseCase: RegisterPetUseCase;

let organizationsRepository: InMemoryOrganizationsRepository;
let createOrganizationUseCase: CreateOrganizationUseCase;

describe('Register Pet Use Case', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    
    registerPetUseCase = new RegisterPetUseCase(petsRepository, organizationsRepository);
    createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepository);
  })

  it('should be able to register a pet', async () => {
    const { organization } = await createOrganizationUseCase.execute({
      name: "Lar dos Caramelos",
      email: "lardoscaramelos@email.com",
      password: "123456",
      phone: "99999999",
      zip_code: "88000-000",
      city: "Florianópolis"
    })

    const { pet } = await registerPetUseCase.execute({
      name: "Caramelinho",
      about: "Serelepe e carinhoso",
      animal: "DOG",
      gender: "MALE",
      breed: "Vira-Lata Caramelo",
      age: "2",
      size: "M",
      energy_level: "MEDIUM",
      independency_level: "HIGH",
      city: organization.city,
      photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcanaldopet.ig.com.br%2Fguia-bichos%2Fcachorros%2F2021-07-31%2Fcachorro-vira-lata-caramelo-um-simbolo-do-brasil.html&psig=AOvVaw2b7BOeJ1VBTPCnHUJ2dtdP&ust=1683119822986000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCB2-bc1v4CFQAAAAAdAAAAABAR",
      organization_id: organization.id
    });

    expect(pet).toHaveProperty("id")
    expect(pet.id).toEqual(expect.any(String));
    expect(pet.organization_id).toEqual(organization.id);
  })
})