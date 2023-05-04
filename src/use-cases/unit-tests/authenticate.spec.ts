import { hash } from "bcryptjs";
import { InMemoryOrganizationsRepository } from "../../repositories/in-memory/in-memory-organizations-repository"
import { AuthenticateUseCase } from "../authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    authenticateUseCase = new AuthenticateUseCase(organizationsRepository);
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'Organização Vira-Lata Caramelo',
      email: 'orgcaramelo@email.com',
      password_hash: await hash('123456', 6),
      phone: '99999999',
      city: 'Florianópolis',
      zip_code: '88800000'
    });

    const { organization } = await authenticateUseCase.execute({
      email: 'orgcaramelo@email.com',
      password: '123456'
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong e-mail', async () => {
    await organizationsRepository.create({
      name: 'Organização Vira-Lata Caramelo',
      email: 'orgcaramelo@email.com',
      password_hash: '123456',
      phone: '99999999',
      city: 'Florianópolis',
      zip_code: '88800000'
    });

    await expect(() => authenticateUseCase.execute({
      email: 'wrong@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'Organização Vira-Lata Caramelo',
      email: 'orgcaramelo@email.com',
      password_hash: '123456',
      phone: '99999999',
      city: 'Florianópolis',
      zip_code: '88800000'
    });

    await expect(() => authenticateUseCase.execute({
      email: 'orgcaramelo@email.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  })

})

