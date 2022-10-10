import axios from 'axios';
import { UsuarioEntregaRetiradaType, UsuarioType } from 'typings/typings';
const usuariosApi = `${process.env.REACT_APP_API_URL}/usuarios`;

export const loginUsuario = async (usuario: UsuarioType) => {
  const usuarioExistente = await getUsuarioByNome(usuario.nome);
  if (
    !(
      usuarioExistente.data &&
      usuarioExistente.data.length &&
      usuarioExistente.data[0].nome === usuario.nome &&
      usuarioExistente.data[0].iniciais === usuario.iniciais &&
      usuarioExistente.data[0].tipo === usuario.tipo
    )
  ) {
    throw new Error('Não foi possível fazer login');
  }
};

export const createUsuario = async (usuario: UsuarioType) => {
  const usuarioExistente = await getUsuarioByNome(usuario.nome);
  if (usuarioExistente.data && usuarioExistente.data.length) {
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
