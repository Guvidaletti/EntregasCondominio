import { AuthContext } from 'contexts/authContext/AuthContext';
import { LayoutContext } from 'contexts/layoutContext/LayoutContext';
import moment from 'moment';
import {
  ButtonThemes,
  CheckCircleIcon,
  Col,
  Modal,
  Row,
  Select,
  TimesCircleIcon,
  ToastTypes,
} from 'plataforma-fundacao-componentes';
import { ModalProps } from 'plataforma-fundacao-componentes/dist/components/modal/Modal';
import { SelectOptionsType } from 'plataforma-fundacao-componentes/dist/components/select/Select';
import { useContext, useEffect, useState } from 'react';
import { getAllMoradoresAtivosDaCasa } from 'services/api/moradores';
import { RetiradaType } from 'typings/typings';
import { objectKeysFiltered } from 'utils/RequestUtils';

interface CadastroRetiradaModalProps extends ModalProps {
  onConfirm: (retirada: RetiradaType) => Promise<void>;
  onCancel: () => void;
  idCasa: number;
  idEntrega: number;
}
const keysToExclude = ['idCasa', 'idEntrega'];

export default function CadastroRetiradaModal(
  props: CadastroRetiradaModalProps
) {
  const { usuario } = useContext(AuthContext);
  const { showToast } = useContext(LayoutContext);
  const [moradoresOptions, setMoradoresOptions] = useState<SelectOptionsType[]>(
    []
  );
  const [loadingMoradores, setLoadingMoradores] = useState(false);
  const [morador, setMorador] = useState<number>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoadingMoradores(true);
    getAllMoradoresAtivosDaCasa(props.idCasa)
      .then((resp) => {
        setMoradoresOptions(
          resp.data.map((morador) => {
            return { label: morador.nome, value: morador.id! };
          })
        );
      })
      .catch(() => {
        showToast({
          label: 'Erro ao carregar moradores!',
          theme: ToastTypes.Error,
          showStatusBar: true,
          timeout: 3000,
          pauseOnFocusLoss: true,
          prevent: true,
        });
      })
      .finally(() => {
        setLoadingMoradores(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idCasa]);

  return (
    <Modal
      {...objectKeysFiltered<ModalProps>(props, keysToExclude)}
      title='Registrar retirada'
      compenseColPaddingContent
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
                dataHora: moment().toDate().getTime(),
                entregaId: props.idEntrega,
                entregasId: props.idEntrega,
                usuarioId: usuario?.id!,
                usuariosId: usuario?.id!,
                residenteId: morador!,
                residentesId: morador!,
              })
              .finally(() => {
                setLoading(false);
              });
          },
          disabled: loading || !morador,
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
          <Select
            label='Morador'
            placeholder='Selecione o morador...'
            value={morador}
            onChange={(evt) => setMorador(evt)}
            options={moradoresOptions}
            loading={loadingMoradores}
          />
        </Col>
      </Row>
    </Modal>
  );
}
