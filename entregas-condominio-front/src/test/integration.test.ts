import moment from 'moment';
import { getAllCasas, getCasaByIdComMoradoresAtivos } from 'services/api/casas';
import { createEntrega, getAllEntregasFiltered } from 'services/api/entregas';
import {
  createMorador,
  desativarMorador,
  getAllMoradores,
} from 'services/api/moradores';
import {
  createUsuario,
  deleteUsuarioByNome,
  getUsuarioByNome,
  loginUsuario,
} from 'services/api/usuario';
import { EntregaType, TipoUsuario, UsuarioType } from 'typings/typings';

describe('IntegrationTests', () => {
  let usuario: UsuarioType = {
    nome: 'Usuario Teste',
    iniciais: 'UT',
    tipo: TipoUsuario.Seguranca,
  };
  const usuarioSemRegistros = {
    nome: 'Sem Registros',
    iniciais: 'SR',
    tipo: TipoUsuario.Porteiro,
  } as UsuarioType;

  beforeAll(async () => {
    const getByNome = await getUsuarioByNome(usuario.nome);
    if (getByNome.data.length) {
      usuario = getByNome.data[0];
    }
    if ((await getUsuarioByNome(usuarioSemRegistros.nome)).data.length) {
      await deleteUsuarioByNome(usuarioSemRegistros.nome);
    }
  });

  it('FluxoCadastroLogin', async () => {
    const getByNome = await getUsuarioByNome(usuario.nome);
    if (getByNome.data.length) {
      usuario = getByNome.data[0];
    }

    const createOrGet = usuario.id
      ? await getUsuarioByNome(usuario.nome)
      : await createUsuario(usuario);

    expect(createOrGet.status).toBe(!usuario.id ? 201 : 200);

    const req = await loginUsuario(usuario);
    expect(req.nome).toBe(usuario.nome);
  });

  it('FluxoRemoverUsuarioSemRegistros', async () => {
    const create = await createUsuario(usuarioSemRegistros);
    expect(create.status).toBe(201);
    const remover = await deleteUsuarioByNome(usuarioSemRegistros.nome);
    expect(remover.status).toBe(200);
  });

  it('FluxoRemoverUsuarioComRegistros', async () => {
    const entregas = await getAllEntregasFiltered({});
    const primeiraEntregaComUsuario = entregas.data.find((e) => e.usuario);
    if (!primeiraEntregaComUsuario) return;
    try {
      expect(
        await deleteUsuarioByNome(primeiraEntregaComUsuario.usuario.nome)
      ).toThrowError();
    } catch {}
  });

  it('FluxoNovaEntrega', async () => {
    const loggedUser = await loginUsuario(usuario);
    const casaExemplo = await getCasaByIdComMoradoresAtivos(1);
    let novaEntrega: EntregaType = {
      casaId: casaExemplo.id,
      casasId: casaExemplo.id,
      dataHora: moment().toDate().getTime(),
      descricao: 'descricao',
      usuarioId: loggedUser.id!,
      usuariosId: loggedUser.id!,
    };
    const retorno = await createEntrega(novaEntrega);
    expect(retorno.status).toBe(201);
  });

  it('Moradores', async () => {
    const retorno = await getAllMoradores();
    expect(retorno.data.length).toBeGreaterThan(0);
  });

  it('PodeIncluirMoradores', async () => {
    const casas = await getAllCasas();
    const casaExemplo = casas.data.find(
      (casa) => casa.residentes.filter((r) => r.status).length < 8
    );
    const retorno = await createMorador({
      casaId: casaExemplo?.id!,
      casasId: casaExemplo?.id!,
      nome: 'Teste',
      rg: ((1 + Math.random()) * 1000000).toFixed(0),
      status: true,
    });

    expect(retorno.status).toBe(201);

    const desabilitar = await desativarMorador(retorno.data);
    expect(desabilitar.status).toBe(200);
  });
});
