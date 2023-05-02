import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { PetDetailsUseCase } from "../petDetails";
import { RegisterPetUseCase } from "../registerPet";

let petsRepository: InMemoryPetsRepository;
let registerPetUseCase: RegisterPetUseCase;
let petDetailsUseCase: PetDetailsUseCase;


describe('Register Pet Use Case', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    registerPetUseCase = new RegisterPetUseCase(petsRepository);
    petDetailsUseCase = new PetDetailsUseCase(petsRepository);

  })

  it('should be able to get a pet details', async () => {

    const { pet } =  await registerPetUseCase.execute({
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

    const petDetails = await petDetailsUseCase.execute({ id: pet.id })

    expect(petDetails).toEqual(expect.objectContaining({
      about: 'Serelepe e carinhoso',
      gender: 'MALE',
      size: 'M',
    }))
    
  });
});