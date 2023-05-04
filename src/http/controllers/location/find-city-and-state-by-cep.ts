import axios from 'axios';

interface cityAndState {
  city: string,
  uf: string
}

export async function FindCityByCep(cep: string) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await axios.get(url);

  const cityAndState: cityAndState = {
    city: response.data.localidade,
    uf: response.data.uf
  }

  return cityAndState;
}