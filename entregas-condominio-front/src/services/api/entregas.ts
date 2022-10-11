import axios from 'axios';
import { EntregaRetiradaUsuarioType, EntregaType } from 'typings/typings';
import { getMergedParamsFromObject } from 'utils/RequestUtils';
const entregasApi = `${process.env.REACT_APP_API_URL}/entregas`;

export const createEntrega = async (entrega: EntregaType) => {
  return await axios.post<void>(entregasApi, entrega);
};

export const getEntregaById = async (id: number) => {
  const urlGet = `${entregasApi}/${id}`;
  return axios.get<EntregaType>(urlGet);
};

export const getAllEntregasFiltered = async (filtrosTela: {
  descricao_like?: string;
}) => {
  const filtros = {
    ...filtrosTela,
    _expand: 'usuario',
    _embed: 'retiradas',
    _sort: 'dataHora',
    _order: 'asc',
  };
  const url = `${entregasApi}?${getMergedParamsFromObject(filtros)}`;
  return await axios.get<EntregaRetiradaUsuarioType[]>(url);
};
