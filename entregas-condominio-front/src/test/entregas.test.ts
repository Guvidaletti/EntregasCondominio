import { getCasaByIdComMoradoresAtivos } from 'services/api/casas';
import { createEntrega } from 'services/api/entregas';
import {
  createUsuario,
  deleteUsuarioByNome,
  getUsuarioByNome,
} from 'services/api/usuario';
import {
  CasaComResidentesType,
  EntregaType,
  TipoUsuario,
  UsuarioType,
} from 'typings/typings';

describe('entregaTests', () => {
  const usuarioTeste = {
    nome: 'Entrega Teste',
    iniciais: 'ET',
    tipo: TipoUsuario.Seguranca,
  } as UsuarioType;

  let casaExemplo: CasaComResidentesType;
  let entregaCriada: EntregaType;
  let usuario: UsuarioType;

  beforeAll(async () => {
    const req = await getUsuarioByNome(usuarioTeste.nome);
    if (req.data.length) {
      usuario = req.data[0];
    } else {
      const create = await createUsuario(usuarioTeste);
      usuario = create.data;
    }

    casaExemplo = await getCasaByIdComMoradoresAtivos(1);
  });

  test('novaEntrega', async () => {
    if (!usuarioTeste.id) return;
    const descricao = 'DescricaoTST';
    const entrega = await createEntrega({
      casaId: casaExemplo.id,
      casasId: casaExemplo.id,
      dataHora: new Date().getTime(),
      descricao,
      usuarioId: usuarioTeste.id!,
      usuariosId: usuarioTeste.id!,
    });

    entregaCriada = entrega.data;
    expect(entregaCriada.descricao).toBe(descricao);
    expect(entrega.status).toBe(201);
  });
});
