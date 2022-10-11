import Logo from 'assets/icons/logo';
import CadastroModal from 'components/cadastroModal/CadastroModal';
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
import { createUsuario } from 'services/api/usuario';
import { TipoUsuario } from 'typings/typings';
import { getUniqueKey } from 'utils/HTMLUtils';

const cols = [12, 10, 8, 7, 6] as any;
const actionCols = [12, 6, 4, 3, 2] as any;
export default function Login() {
  const { login, usuario } = useContext(AuthContext);
  const { showToast, openModal, closeModal } = useContext(LayoutContext);
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
        <Col cols={actionCols}>
          <Button
            w100
            theme={ButtonThemes.Primary}
            onClick={() => {
              login({ nome, iniciais, tipo: tipo as TipoUsuario }).catch(() => {
                showToast({
                  label: 'Erro ao fazer login!',
                  theme: ToastTypes.Error,
                  showStatusBar: true,
                  timeout: 3000,
                  pauseOnFocusLoss: true,
                  prevent: true,
                });
              });
            }}
            disabled={!nome || !tipo || !iniciais}
          >
            Entrar
          </Button>
        </Col>
      </Row>
      <Row centralized>
        <Col cols={actionCols}>
          <Button
            theme={ButtonThemes.Default}
            onClick={() => {
              const mk = getUniqueKey();
              openModal(CadastroModal, {
                modalKey: mk,
                preventMaskExit: true,
                onConfirm: async (usuario) => {
                  return createUsuario(usuario)
                    .then(() => {
                      login(usuario);
                    })
                    .catch(() => {
                      showToast({
                        label: 'Erro ao fazer o cadastro!',
                        theme: ToastTypes.Error,
                        showStatusBar: true,
                        timeout: 3000,
                        pauseOnFocusLoss: true,
                        prevent: true,
                      });
                    })
                    .finally(() => {
                      closeModal(mk);
                    });
                },
                onClose: () => closeModal(mk),
                onCancel: () => closeModal(mk),
              });
            }}
            w100
          >
            Cadastro
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
