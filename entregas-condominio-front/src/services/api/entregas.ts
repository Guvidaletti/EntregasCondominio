import axios from 'axios';
import { EntregaRetiradaUsuarioType, EntregaType } from 'typings/typings';
import { getMergedParamsFromObject } from 'utils/RequestUtils';
const entregasApi = `${process.env.REACT_APP_API_URL}/entregas`;

export const createEntrega = async (entrega: EntregaType) => {
  return await axios.post<EntregaType>(entregasApi, entrega);
};

export const getEntregaById = async (id: number) => {
  const urlGet = `${entregasApi}/${id}?_embed=retiradas&_expand=usuario`;
  return await axios.get<EntregaRetiradaUsuarioType>(urlGet);
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

export const getQuantidadeEntregasUltimosSeteDias = async () => {
  const url = `${entregasApi}/`;
  const entregas = await axios.get<EntregaType[]>(url);
  const d = new Date(new Date().getTime() - 7 * 24 * 60 * 1000).getTime();
  return entregas.data.filter((entrega) => entrega.dataHora > d).length;
};

export const getTempoMedioRetiradasEntregas = async () => {
  const url = `${entregasApi}?_embed=retiradas`;
  const entregas = await axios.get<EntregaRetiradaUsuarioType[]>(url);
  const arr: number[] = [];
  entregas.data.forEach((e) => {
    if (e.retiradas.length) {
      arr.push(e.retiradas[0].dataHora - e.dataHora);
    }
  });
  return (
    arr.reduce((ac, atual) => {
      return ac + atual;
    }, 0) / arr.length
  );
};

export const getQuantidadeEntregasNaoRetiradas = async () => {
  const url = `${entregasApi}?_embed=retiradas`;
  const entregas = await axios.get<EntregaRetiradaUsuarioType[]>(url);
  return entregas.data.filter((e) => !e.retiradas || !e.retiradas.length)
    .length;
};
