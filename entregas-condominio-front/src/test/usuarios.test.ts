import {
  createUsuario,
  deleteUsuarioByNome,
  getUsuarioByNome,
  loginUsuario,
} from 'services/api/usuario';
import { TipoUsuario } from 'typings/typings';

describe('usuariosTests', () => {
  const usuarioTeste = {
    nome: 'Usuario Teste',
    iniciais: 'UT',
    tipo: TipoUsuario.Seguranca,
  };

  beforeAll(async () => {
    if ((await getUsuarioByNome(usuarioTeste.nome)).data.length) {
      await deleteUsuarioByNome(usuarioTeste.nome);
    }
  });

  test('criarUsuario', async () => {
    const create = await createUsuario(usuarioTeste);
    expect(create.status).toBe(201);
  });

  test('loginUsuario', async () => {
    const req = await loginUsuario(usuarioTeste);
    expect(req.nome).toBe(usuarioTeste.nome);
  });

  test('consultarUsuarioPorNome', async () => {
    const usuarios = await getUsuarioByNome(usuarioTeste.nome);
    expect(usuarios.data).toHaveLength(1);
    expect(usuarios.data[0].nome).toBe(usuarioTeste.nome);
  });

  test('removerUsuario', async () => {
    const remover = await deleteUsuarioByNome(usuarioTeste.nome);
    expect(remover.status).toBe(200);
  });

  test('removerUsuarioComRegistros', async () => {
    // todo: here
  });
});
