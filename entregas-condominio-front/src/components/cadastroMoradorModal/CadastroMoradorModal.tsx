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
import { SelectOptionsType } from 'plataforma-fundacao-componentes/dist/components/select/Select';
import { useEffect, useState } from 'react';
import { getAllCasas } from 'services/api/casas';
import { ResidenteType } from 'typings/typings';

interface CadastroMoradorProps extends ModalProps {
  onConfirm: (morador: ResidenteType) => Promise<void>;
  onCancel: () => void;
}

export default function CadastroMoradorModal(props: CadastroMoradorProps) {
  const [casasOptions, setCasasOptions] = useState<SelectOptionsType[]>([]);
  const [loadingCasas, setLoadingCasas] = useState(false);
  const [casa, setCasa] = useState<number>();
  const [rg, setRg] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

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
      compenseColPaddingContent
      title='Cadastro de morador'
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
              .onConfirm({
                nome,
                rg,
                status: true,
                casaId: casa!,
                casasId: casa!,
              })
              .finally(() => {
                setLoading(false);
              });
          },
          disabled: loading || !nome || !casa || !rg,
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
            label='Nome'
            placeholder='Digite o nome...'
            value={nome}
            onChange={(evt) => setNome(evt.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            label='RG'
            placeholder='Digite o RG (somente números)...'
            value={rg}
            onChange={(evt) => setRg(evt.target.value.replace(/\D/g, ''))}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Select
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
