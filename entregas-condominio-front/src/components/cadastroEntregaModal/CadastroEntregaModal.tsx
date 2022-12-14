import { AuthContext } from 'contexts/authContext/AuthContext';
import moment from 'moment';
import {
  Col,
  Row,
  Modal,
  TimesCircleIcon,
  CheckCircleIcon,
  ButtonThemes,
  Select,
  Input,
} from 'plataforma-fundacao-componentes';
import { ModalProps } from 'plataforma-fundacao-componentes/dist/components/modal/Modal';
import { SelectOptionsType } from 'plataforma-fundacao-componentes/dist/components/select/Select';
import { useContext, useEffect, useState } from 'react';
import { getAllCasas } from 'services/api/casas';
import { EntregaType } from 'typings/typings';

interface CadastroEntregaModalProps extends ModalProps {
  onConfirm: (entrega: EntregaType) => Promise<void>;
  onCancel: () => void;
}

export default function CadastroEntregaModal(props: CadastroEntregaModalProps) {
  const { usuario } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [casa, setCasa] = useState<number>();
  const [casasOptions, setCasasOptions] = useState<SelectOptionsType[]>([]);
  const [loadingCasas, setLoadingCasas] = useState(false);

  useEffect(() => {
    setLoadingCasas(true);
    getAllCasas()
      .then((resp) => {
        setCasasOptions(
          resp.data.map((c) => {
            return { label: `Casa ${c.id}`, value: c.id } as SelectOptionsType;
          })
        );
      })
      .finally(() => setLoadingCasas(false));
  }, []);

  return (
    <Modal
      {...props}
      title='Registrar entrega'
      compenseColPaddingContent
      footer={[
        {
          id: 'cadastro-entrega-cancelar',
          theme: ButtonThemes.Secondary,
          children: 'Cancelar',
          leftIcon: <TimesCircleIcon />,
          onClick: props.onCancel,
        },
        {
          id: 'cadastro-entrega-confirmar',
          children: 'Confirmar',
          leftIcon: <CheckCircleIcon />,
          onClick: () => {
            setLoading(true);
            props
              .onConfirm({
                descricao,
                dataHora: moment().toDate().getTime(),
                usuarioId: usuario?.id!,
                usuariosId: usuario?.id!,
                casaId: casa!,
                casasId: casa!,
              })
              .finally(() => {
                setLoading(false);
              });
          },
          disabled: loading || !casa || !descricao,
          loader: {
            loading,
            loaderSize: 2,
            loaderTheme: 'primary',
          },
        },
      ]}
    >
      <Row>
        <Col>
          <Input
            id='cadastro-entrega-descricao'
            placeholder='Digite a descri????o...'
            label='Descri????o'
            value={descricao}
            onChange={(evt) => setDescricao(evt.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Select
            id='cadastro-entrega-casa'
            label='Casa'
            placeholder='Selecione a casa...'
            options={casasOptions}
            value={casa}
            onChange={(evt) => setCasa(evt)}
            loading={loadingCasas}
          />
        </Col>
      </Row>
    </Modal>
  );
}
