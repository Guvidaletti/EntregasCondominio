import CadastroEntregaModal from 'components/cadastroEntregaModal/CadastroEntregaModal';
import CadastroRetiradaModal from 'components/cadastroRetiradaModal/CadastroRetiradaModal';
import { LayoutContext } from 'contexts/layoutContext/LayoutContext';
import moment from 'moment';
import {
  BreadCrumb,
  Button,
  CheckCircleIcon,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  IconButton,
  Input,
  OptionsIcon,
  Row,
  Select,
  TableWithOverflow,
  ThreeDotsLoader,
  Title,
  ToastTypes,
  useDropOpened,
} from 'plataforma-fundacao-componentes';
import { ColumnObject } from 'plataforma-fundacao-componentes/dist/components/tableWithOverflow/TableWithOverflow';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';
import { createEntrega, getAllEntregasFiltered } from 'services/api/entregas';
import { createRetirada } from 'services/api/retiradas';
import { EntregaRetiradaUsuarioType } from 'typings/typings';
import { getUniqueKey } from 'utils/HTMLUtils';

export default function Entregas() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dropOpened, toggleOpened] = useDropOpened<number>();
  const { showToast, openModal, closeModal } = useContext(LayoutContext);
  const [descricao, setDescricao] = useState<string>('');
  const [entregas, setEntregas] = useState<EntregaRetiradaUsuarioType[]>();
  const [retirada, setRetirada] = useState<'SIM' | 'NAO' | 'AMBOS'>('AMBOS');

  const carregar = useCallback(() => {
    setLoading(true);
    getAllEntregasFiltered({})
      .then((resp) => {
        setEntregas(resp.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        showToast({
          label: 'Erro ao carregar entregas!',
          theme: ToastTypes.Error,
          showStatusBar: true,
          timeout: 3000,
          pauseOnFocusLoss: true,
          prevent: true,
        });
      });
  }, [showToast]);

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entregasFiltered = useMemo(() => {
    return entregas
      ? entregas
          ?.filter((entrega) => {
            return (
              (!descricao || entrega.descricao.includes(descricao)) &&
              (retirada === 'AMBOS' ||
                (retirada === 'SIM' && entrega.retiradas.length) ||
                (retirada === 'NAO' && !entrega.retiradas.length))
            );
          })
          .map((entrega) => {
            return {
              ...entrega,
              dataEntrega: moment(entrega.dataHora).format(
                'DD/MM/YYYY - HH:mm'
              ),
              retirada: entrega.retiradas.length ? 'Sim' : 'Não',
              actions: (
                <DropdownMenu
                  opened={dropOpened === entrega.id!}
                  setOpened={() =>
                    toggleOpened(entrega.id!, dropOpened !== entrega.id!)
                  }
                  content={
                    <div>
                      <DropdownItem
                        label='Registrar retirada'
                        onClick={() => {
                          toggleOpened(entrega.id!, false);
                          const modalKey = getUniqueKey();
                          openModal(CadastroRetiradaModal, {
                            modalKey,
                            preventMaskExit: true,
                            mobileOnXS: true,
                            idCasa: entrega.casaId,
                            idEntrega: entrega.id!,
                            onClose: () => closeModal(modalKey),
                            onCancel: () => closeModal(modalKey),
                            onConfirm: (retirada) => {
                              return createRetirada(retirada)
                                .then(() => {
                                  closeModal(modalKey);
                                  carregar();
                                })
                                .catch((err) => {
                                  showToast({
                                    label: err.message,
                                    theme: ToastTypes.Error,
                                    showStatusBar: true,
                                    timeout: 3000,
                                    pauseOnFocusLoss: true,
                                    prevent: true,
                                  });
                                });
                            },
                          });
                        }}
                      />
                    </div>
                  }
                >
                  <IconButton
                    disabled={Boolean(entrega.retiradas.length)}
                    icon={<OptionsIcon />}
                    onClick={() =>
                      toggleOpened(entrega.id!, dropOpened !== entrega.id!)
                    }
                  />
                </DropdownMenu>
              ),
            };
          })
      : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entregas, descricao, retirada, dropOpened]);

  const columns = useMemo(() => {
    return [
      { key: 'id', value: 'ID', props: { align: 'center' } },
      { key: 'descricao', value: 'Descrição', props: { align: 'center' } },
      {
        key: 'dataEntrega',
        value: 'Data da Entrega',
        props: { align: 'center' },
      },
      { key: 'casaId', value: 'Casa', props: { align: 'center' } },
      { key: 'retirada', value: 'Retirada?', props: { align: 'center' } },
      { key: 'actions', value: ' ', props: { align: 'center' } },
    ] as ColumnObject[];
  }, []);

  return (
    <Container position='absolute' verticalPadding>
      <Row>
        <Col>
          <BreadCrumb
            path={[
              { label: 'Início', onClick: () => navigate(Paths.home) },
              { label: 'Entregas' },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Entregas</Title>
        </Col>
      </Row>
      <Row>
        <Col buttonActionsCol end>
          <Button
            id='entregas-cadastro-button'
            leftIcon={<CheckCircleIcon />}
            onClick={() => {
              const modalKey = getUniqueKey();
              openModal(CadastroEntregaModal, {
                modalKey,
                preventMaskExit: true,
                mobileOnXS: true,
                onClose: () => closeModal(modalKey),
                onCancel: () => closeModal(modalKey),
                onConfirm: (entrega) =>
                  createEntrega(entrega)
                    .then(() => {
                      carregar();
                      closeModal(modalKey);
                    })
                    .catch(() => {
                      showToast({
                        label: 'Erro ao registrar entrega!',
                        theme: ToastTypes.Error,
                        showStatusBar: true,
                        timeout: 3000,
                        pauseOnFocusLoss: true,
                        prevent: true,
                      });
                    }),
              });
            }}
          >
            Registrar entrega
          </Button>
        </Col>
      </Row>
      <Row>
        <Col cols={[12, 12, 6, 6, 6]}>
          <Input
            label='Descrição'
            placeholder='Digite a descrição...'
            value={descricao}
            onChange={(evt) => setDescricao(evt.target.value)}
          />
        </Col>
        <Col cols={[12, 12, 6, 6, 6]}>
          <Select
            label='Retirada'
            placeholder='Selecione...'
            value={retirada}
            onChange={(value) => {
              setRetirada(value || 'AMBOS');
            }}
            clearButton={retirada !== 'AMBOS'}
            options={[
              { label: 'Selecione...', value: 'AMBOS' },
              { label: 'Sim', value: 'SIM' },
              { label: 'Não', value: 'NAO' },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TableWithOverflow
            showTopNavigator={false}
            lines={entregasFiltered}
            columns={columns}
            noResultMessage='Nenhuma entrega encontrada...'
          />
        </Col>
      </Row>
      {loading ? (
        <Row>
          <Col centralized>
            <ThreeDotsLoader />
          </Col>
        </Row>
      ) : undefined}
    </Container>
  );
}
