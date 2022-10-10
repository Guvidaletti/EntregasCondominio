import { useState, useContext } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import Logo from '../../assets/icons/logo';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { TipoUsuario } from '../../typings/typings';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [iniciais, setIniciais] = useState('');
  const [tipo, setTipo] = useState<TipoUsuario | string>('');
  return (
    <Container>
      <Row>
        <Logo size={200} />
      </Row>
      <Row>
        <Form
          onSubmit={(evt) => {
            evt.preventDefault();
            login({ nome, iniciais, tipo: tipo as TipoUsuario });
          }}
        >
          <Row className='mb-3'>
            <Form.Label htmlFor='nome'>Nome</Form.Label>
            <Form.Control
              id='nome'
              name='nome'
              type='text'
              value={nome}
              onChange={(evt) => {
                setIniciais(
                  evt.target.value
                    .trim()
                    .split(' ')
                    .map((s) => s.charAt(0))
                    .join('')
                    .toUpperCase()
                );
                setNome(evt.target.value);
              }}
            />
          </Row>
          <Row className='mb-3'>
            <Form.Label htmlFor='iniciais'>Iniciais</Form.Label>
            <Form.Control
              id='iniciais'
              name='iniciais'
              type='text'
              value={iniciais}
              onChange={(evt) => setIniciais(evt.target.value)}
            />
          </Row>

          <Row className='mb-3'>
            <Form.Label htmlFor='tipoUsuario'>Tipo de Usuário</Form.Label>
            <Form.Select
              id='tipoUsuario'
              name='tipoUsuario'
              value={tipo}
              onChange={(evt) => setTipo(evt.target.value as TipoUsuario)}
            >
              <option disabled value=''>
                Selecione...
              </option>
              <option value={TipoUsuario.Porteiro}>Porteiro</option>
              <option value={TipoUsuario.Seguranca}>Segurança</option>
            </Form.Select>
          </Row>
          <Row>
            <Button
              type='submit'
              className='mt-3'
              disabled={!nome || !tipo || !iniciais}
            >
              Entrar
            </Button>
          </Row>
        </Form>
      </Row>
      <Row></Row>
    </Container>
  );
}
