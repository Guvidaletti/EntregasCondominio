import Logo from 'assets/icons/logo';
import { AuthContext } from 'contexts/authContext/AuthContext';
import { LayoutContext } from 'contexts/layoutContext/LayoutContext';
import {
  Button,
  ButtonThemes,
  Col,
  Container,
  Input,
  Row,
  Select,
  ToastTypes,
} from 'plataforma-fundacao-componentes';
import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';
import { TipoUsuario } from 'typings/typings';

const cols = [12, 10, 8, 7, 6] as any;
export default function Login() {
  const { login, usuario } = useContext(AuthContext);
  const { showToast } = useContext(LayoutContext);
  const [nome, setNome] = useState('');
  const [iniciais, setIniciais] = useState('');
  const [tipo, setTipo] = useState<TipoUsuario | string>('');
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (usuario) {
      navigate(Paths.home, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  return (
    <Container position='absolute' verticalPadding>
      <Row>
        <Col centralized>
          <Logo size={200} />
        </Col>
      </Row>
      <Row>
        <Row centralized>
          <Col cols={cols}>
            <Input
              label='Nome'
              placeholder='Digite o nome...'
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
          </Col>
        </Row>
        <Row centralized>
          <Col cols={cols}>
            <Input
              label='Iniciais'
              value={iniciais}
              onChange={(evt) => setIniciais(evt.target.value)}
              placeholder='Digite as iniciais...'
            />
          </Col>
        </Row>
        <Row centralized>
          <Col cols={cols}>
            <Select
              label='Tipo de Usuário'
              placeholder='Selecione...'
              value={tipo}
              onChange={(evt) => setTipo(evt as TipoUsuario)}
              options={[
                { value: TipoUsuario.Porteiro, label: 'Porteiro' },
                { value: TipoUsuario.Seguranca, label: 'Segurança' },
              ]}
            />
          </Col>
        </Row>
        <Row centralized>
          <Col cols={cols}>
            <Button
              w100
              theme={ButtonThemes.Primary}
              onClick={() => {
                login({ nome, iniciais, tipo: tipo as TipoUsuario }).catch(
                  () => {
                    showToast({
                      label: 'Erro ao fazer login!',
                      theme: ToastTypes.Error,
                      showStatusBar: true,
                      timeout: 3000,
                      pauseOnFocusLoss: true,
                      prevent: true,
                    });
                  }
                );
              }}
              disabled={!nome || !tipo || !iniciais}
            >
              Entrar
            </Button>
          </Col>
        </Row>
        <Row centralized>
          <Col cols={cols}>
            <Button theme={ButtonThemes.Default} onClick={() => {}} w100>
              Cadastro
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
