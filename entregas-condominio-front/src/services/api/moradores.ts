import axios from 'axios';
import { ResidenteType } from 'typings/typings';
import { getCasaByIdComMoradoresAtivos } from './casas';

const moradoresApi = `${process.env.REACT_APP_API_URL}/residentes`;

export const getAllMoradores = () => {
  const url = `${moradoresApi}/`;
  return axios.get<ResidenteType[]>(url);
};

export const getAllMoradoresAtivos = () => {
  const url = `${moradoresApi}?status=true`;
  return axios.get<ResidenteType[]>(url);
};

export const createMorador = async (morador: ResidenteType) => {
  const casa = await getCasaByIdComMoradoresAtivos(morador.casaId);
  if (casa.residentes.length >= 8) {
    throw new Error('Casa cheia!');
  }
  if (await getMoradorByRG(morador.rg)) {
    throw new Error('RG já cadastrado!');
  }
  const url = `${moradoresApi}`;
  return await axios.post<void>(url, morador);
};

export const getMoradorByRG = async (rg: string) => {
  const url = `${moradoresApi}?rg=${rg}`;
  const residente = await axios.get<ResidenteType[]>(url);
  if (residente.data && residente.data.length) {
    return residente.data[0];
  }
  return Promise.reject();
};

export const desativarMorador = async (morador: ResidenteType) => {
  const url = `${moradoresApi}/${morador.id}`;
  return axios.put(url, { ...morador, status: false });
};

