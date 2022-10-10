import {
  ButtonThemes,
  CheckCircleIcon,
  Col,
  Input,
  Modal,
  Row,
  Select,
  TimesCircleIcon,
} from 'plataforma-fundacao-componentes';
import { ModalProps } from 'plataforma-fundacao-componentes/dist/components/modal/Modal';
import { useState } from 'react';
import { TipoUsuario, UsuarioType } from 'typings/typings';

interface CadastroModalProps extends ModalProps {
  onConfirm: (usuario: UsuarioType) => Promise<void>;
  onCancel: () => void;
}
export default function CadastroModal(props: CadastroModalProps) {
  const [nome, setNome] = useState('');
  const [iniciais, setIniciais] = useState('');
  const [tipo, setTipo] = useState<TipoUsuario | string>('');
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      {...props}
      compenseColPaddingContent
      title='Cadastro de usuário'
      footer={[
        {
          theme: ButtonThemes.Secondary,
          children: 'Cancelar',
          leftIcon: <TimesCircleIcon />,
          onClick: props.onCancel,
        },
        {
          children: 'Confirmar',
          leftIcon: <CheckCircleIcon />,
          onClick: () => {
            setLoading(true);
            props
              .onConfirm({ nome, iniciais, tipo: tipo as TipoUsuario })
              .finally(() => {
                setLoading(false);
              });
          },
          disabled: loading || !nome || !tipo || !iniciais,
          loader: {
            loading,
            loaderSize: 2,
            loaderTheme: 'primary',
          },
        },
      ]}
    >
      <Row centralized>
        <Col>
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
        <Col>
          <Input
            label='Iniciais'
            value={iniciais}
            onChange={(evt) => setIniciais(evt.target.value)}
            placeholder='Digite as iniciais...'
          />
        </Col>
      </Row>
      <Row centralized>
        <Col>
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
    </Modal>
  );
}
