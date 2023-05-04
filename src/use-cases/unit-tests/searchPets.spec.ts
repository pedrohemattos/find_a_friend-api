import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { SearchPetsUseCase } from "../searchPets";
import { RegisterPetUseCase } from "../registerPet";
import { InMemoryOrganizationsRepository } from "../../repositories/in-memory/in-memory-organizations-repository";

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let registerPetUseCase: RegisterPetUseCase;
let searchPetsUseCase: SearchPetsUseCase;

describe('Search Pet Use Case', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    
    registerPetUseCase = new RegisterPetUseCase(petsRepository, organizationsRepository);
    searchPetsUseCase = new SearchPetsUseCase(petsRepository);
  })

  it('should be able to list all pets from a given city', async () => {
    const org = await organizationsRepository.create({
      name: "org",
      email: "org@email.com",
      city: "Florianópolis",
      password_hash: "123",
      phone: "123",
      zip_code: "123",
    });

    await registerPetUseCase.execute({
      name: "Caramelinho",
      about: "Serelepe e carinhoso",
      animal: "DOG",
      gender: "MALE",
      breed: "Vira-Lata Caramelo",
      age: "2",
      size: "M",
      energy_level: "MEDIUM",
      independency_level: "HIGH",
      city: "Cidade 1",
      photo: "url_da_foto",
      organization_id: org.id
    });

    await registerPetUseCase.execute({
      name: "Thor",
      about: "Adora brincar",
      animal: "DOG",
      gender: "MALE",
      breed: "Bulldog Francês",
      age: "2",
      size: "P",
      energy_level: "HIGH",
      independency_level: "LOW",
      city: "Cidade 2",
      photo: "url_da_foto",
      organization_id: org.id
    });

    const { pets } = await searchPetsUseCase.execute({
      city: 'Cidade 2'
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Thor" })
    ]));
    
  });
});