import axios from 'axios';
import { UsuarioEntregaRetiradaType, UsuarioType } from 'typings/typings';

const usuariosApi = `${process.env.api}/usuarios`;

export const createUsuario = async (usuario: UsuarioType) => {
  const usuarioExiste = await getUsuarioByNome(usuario.nome);
  if (usuarioExiste.data && usuarioExiste.data.length) {
    throw new Error('Usuário já existe');
  }

  return axios.post<void>(usuariosApi, usuario);
};

export const getAllUsuarios = () => {
  const url = `${usuariosApi}/`;
  return axios.get<UsuarioType[]>(url);
};

export const getUsuarioByNome = (nome: string) => {
  const url = `${usuariosApi}?nome=${nome}`;
  return axios.get<UsuarioType[]>(url);
};

export const deleteUsuarioByNome = async (nome: string) => {
  const url = `${usuariosApi}?nome=${nome}&_embed=entregas&_embed=retiradas`;
  const usuario = await axios.get<UsuarioEntregaRetiradaType[]>(url);
  if (
    (usuario.data && usuario.data.length && usuario.data[0].entregas.length) ||
    usuario.data[0].retiradas.length
  ) {
    throw new Error('Usuário não pode ser deletado');
  }
  const urlDelete = `${usuariosApi}/${usuario.data[0].id}`;
  return axios.delete<void>(urlDelete);
};
