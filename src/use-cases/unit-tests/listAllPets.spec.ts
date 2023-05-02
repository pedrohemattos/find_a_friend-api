import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { ListAllPetsUseCase } from "../listAllPets";
import { RegisterPetUseCase } from "../registerPet";

let petsRepository: InMemoryPetsRepository;
let registerPetUseCase: RegisterPetUseCase;
let listAllPetsUseCase: ListAllPetsUseCase;

describe('Register Pet Use Case', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    registerPetUseCase = new RegisterPetUseCase(petsRepository);
    listAllPetsUseCase = new ListAllPetsUseCase(petsRepository);
  })

  it('should be able to list all pets from a given city', async () => {

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
      organization_id: "org-id"
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
      organization_id: "org-id"
    });

    const pets = await listAllPetsUseCase.execute({
      city: 'Cidade 2'
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Thor" })
    ]));
    
  });
});