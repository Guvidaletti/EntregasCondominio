import axios from 'axios';
import { EntregaType } from 'typings/typings';
const entregasApi = `${process.env.REACT_APP_API_URL}/entregas`;

export const createEntregas = async (entrega:EntregaType) => {
    
    return axios.post<void>(entregasApi,entrega);

  };


export const getEntregaById = async (id:number) => {
    const urlGet = `${entregasApi}/${id}`;

    return axios.get<EntregaType>(urlGet);
}