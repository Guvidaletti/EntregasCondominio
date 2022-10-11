import {
  createUsuario,
  deleteUsuarioByNome,
  getUsuarioByNome,
  loginUsuario,
} from 'services/api/usuario';
import { TipoUsuario, UsuarioType } from 'typings/typings';

describe('IntegrationTests', () => {
  let usuario: UsuarioType = {
    nome: 'Usuario Teste',
    iniciais: 'UT',
    tipo: TipoUsuario.Seguranca,
  };
  beforeAll(async () => {
    if ((await getUsuarioByNome(usuario.nome)).data.length) {
      await deleteUsuarioByNome(usuario.nome);
    }
  });
  it('FluxoCadastroLogin', () => {
    test('criarUsuario', async () => {
      const create = await createUsuario(usuario);
      expect(create.status).toBe(201);
      usuario.id = create.data.id;
    });

    test('loginUsuario', async () => {
      const req = await loginUsuario(usuario);
      expect(req.nome).toBe(usuario.nome);
    });

    test('')

  });
});
