import axios from 'axios';
import { CasaComResidentesType } from 'typings/typings';

const casasApi = `${process.env.REACT_APP_API_URL}/casas`;

export const getCasaByIdComMoradoresAtivos = async (
  id: number
): Promise<CasaComResidentesType> => {
  const url = `${casasApi}?id=${id}&_embed=residentes`;
  const casa = await axios.get<CasaComResidentesType[]>(url);
  if (casa.data.length) {
    return {
      id: casa.data[0].id,
      residentes: casa.data[0].residentes.filter((r) => r.status),
    };
  }
  return Promise.reject();
};
