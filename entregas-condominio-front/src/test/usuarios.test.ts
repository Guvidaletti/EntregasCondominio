// import { render, screen } from '@testing-library/react';
// import { it } from 'node:test';
// import Login from 'pages/login/Login';
import {
  createUsuario,
  deleteUsuarioByNome,
  getUsuarioByNome,
} from 'services/api/usuario';
import { TipoUsuario } from 'typings/typings';

describe('usuariosTests', () => {
  const nome = 'Gustavo Teste';
  beforeAll(async () => {
    if ((await getUsuarioByNome(nome)).data.length) {
      await deleteUsuarioByNome(nome);
    }
  });

  test('criarUsuario', async () => {
    const create = await createUsuario({
      nome: 'Gustavo Teste',
      iniciais: 'GT',
      tipo: TipoUsuario.Seguranca,
    });

    expect(create.status).toBe(201);
  });

  test('consultarUsuarioPorNome', async () => {
    const usuarios = await getUsuarioByNome(nome);
    expect(usuarios.data).toHaveLength(1);
    expect(usuarios.data[0].nome).toBe(nome);
  });

  test('removerUsuario', async () => {
    const remover = await deleteUsuarioByNome(nome);
    expect(remover.status).toBe(200);
  });
});
