import axios from 'axios';
import { RetiradaType } from 'typings/typings';
import { getEntregaById } from './entregas';
import { getMoradorAtivoById } from './moradores';
const retiradasApi = `${process.env.REACT_APP_API_URL}/retiradas`;

export const createRetirada = async (retirada: RetiradaType) => {
  const residente = await getMoradorAtivoById(retirada.residenteId);
  if (!residente) {
    throw new Error('Morador não existe!');
  }

  const entregaExistente = await getEntregaById(retirada.entregaId);
  if (!entregaExistente.data) {
    throw new Error('Entrega não encontrada!');
  }

  if (entregaExistente.data.retiradas.length) {
    throw new Error('Entrega já foi retirada!');
  }

  return axios.post<void>(retiradasApi, retirada);
};
