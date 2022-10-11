import axios from 'axios';
import { UsuarioEntregaRetiradaType, EntregaType, RetiradaType, ResidenteType } from 'typings/typings';
import { getUsuarioById } from './usuario';
import { getEntregaById } from './entregas';
const retiradasApi = `${process.env.REACT_APP_API_URL}/retiradas`;

export const createRetirada = async (retirada:RetiradaType, usuario: UsuarioEntregaRetiradaType, residente : ResidenteType) => {

    const usuarioExistente = await getUsuarioById(usuario.id!);
    if (usuarioExistente.data && usuarioExistente.data.length) {
      throw new Error('Usuário já existe');
    }

    const entregaExistente = await getEntregaById(retirada.entregaId);
    if(entregaExistente.data){

    }

    //TODO adicionar validacao do residente


    return axios.post<void>(retiradasApi,retirada);
    
  };