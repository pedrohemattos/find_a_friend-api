import { InMemoryOrganizationsRepository } from "../../repositories/in-memory/in-memory-organizations-repository";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { FilterPetsUseCase } from "../filterPets";
import { RegisterPetUseCase } from "../registerPet";

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let registerPetUseCase: RegisterPetUseCase;
let filterPetsUseCase: FilterPetsUseCase;

describe('Filter Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();

    registerPetUseCase = new RegisterPetUseCase(petsRepository, organizationsRepository);
    filterPetsUseCase = new FilterPetsUseCase(petsRepository);
  })

  it('should be able to filter pets by some of their characteristics.', async () => {
    const org = await organizationsRepository.create({
      name: "org",
      email: "org@email.com",
      city: "Florianópolis",
      password_hash: "123",
      phone: "123",
      zip_code: "123",
    })

    await registerPetUseCase.execute({
      name: "Caramelinho",
      about: "Serelepe e carinhoso",
      animal: "DOG",
      gender: "MALE",
      breed: "Vira-Lata Caramelo",
      age: "4",
      size: "M",
      energy_level: "MEDIUM",
      independency_level: "HIGH",
      city: "Cidade 1",
      photo: "url_da_foto",
      organization_id: org.id
    });

    await registerPetUseCase.execute({
      name: "Caramelinha",
      about: "Serelepe e carinhosa",
      animal: "DOG",
      gender: "FEMALE",
      breed: "Vira-Lata Caramelo",
      age: "4",
      size: "M",
      energy_level: "MEDIUM",
      independency_level: "HIGH",
      city: "Cidade 1",
      photo: "url_da_foto",
      organization_id: org.id
    });

    await registerPetUseCase.execute({
      name: "Billy",
      about: "Adora brincar",
      animal: "CAT",
      gender: "MALE",
      age: "2",
      size: "P",
      energy_level: "LOW",
      independency_level: "HIGH",
      city: "Cidade 2",
      photo: "url_da_foto",
      organization_id: org.id
    });

    await registerPetUseCase.execute({
      name: "Jurema",
      about: "Adora brincar",
      animal: "CAT",
      gender: "FEMALE",
      age: "2",
      size: "P",
      energy_level: "LOW",
      independency_level: "HIGH",
      city: "Cidade 2",
      photo: "url_da_foto",
      organization_id: org.id
    });

    const { pets } = await filterPetsUseCase.execute({
      query: {
        animal: "CAT",
        gender: "FEMALE"
      }
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: "Jurema"
      })
    ]));

  });
});