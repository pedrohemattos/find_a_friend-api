import axios from 'axios';
import { AddressNotFoundError } from '../../../use-cases/errors/address-not-found-error';

interface cityAndState {
  city: string,
  uf: string
}

export async function FindCityByCep(cep: string) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await axios.get(url);
  
    const cityAndState: cityAndState = {
      city: response.data.localidade,
      uf: response.data.uf
    }
    
    return cityAndState;
  } catch (error) {
    throw new AddressNotFoundError();
  }

}