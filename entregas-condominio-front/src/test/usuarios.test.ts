// import { render, screen } from '@testing-library/react';
// import { it } from 'node:test';
// import Login from 'pages/login/Login';
import { createUsuario } from 'services/api/usuario';
import { TipoUsuario } from 'typings/typings';

it('criarUsuario', async () => {
  const a = await createUsuario({
    nome: 'Gustavo Teste',
    iniciais: 'GT',
    tipo: TipoUsuario.Seguranca,
  });

  expect(a.status).toBe(201);
});
