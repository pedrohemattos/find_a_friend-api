import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { PetDetailsUseCase } from "../petDetails";

let petsRepository: InMemoryPetsRepository;
let petDetailsUseCase: PetDetailsUseCase;


describe('Pet Details Pet Use Case', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    petDetailsUseCase = new PetDetailsUseCase(petsRepository);

  });

  it('should be able to get a pet details', async () => {

    const newPet =  await petsRepository.register({
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

    const { pet } = await petDetailsUseCase.execute({ id: newPet.id });

    expect(pet).toEqual(expect.objectContaining({
      about: 'Serelepe e carinhoso',
      gender: 'MALE',
      size: 'M',
    }));
    
  });
});