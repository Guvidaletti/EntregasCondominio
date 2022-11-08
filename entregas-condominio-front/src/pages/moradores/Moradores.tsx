import CadastroMoradorModal from 'components/cadastroMoradorModal/CadastroMoradorModal';
import { LayoutContext } from 'contexts/layoutContext/LayoutContext';
import {
  AddCircleIcon,
  BreadCrumb,
  Button,
  Col,
  Container,
  DestructiveModal,
  DropdownItem,
  DropdownMenu,
  IconButton,
  OptionsIcon,
  Row,
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
import {
  createMorador,
  desativarMorador,
  getAllMoradores,
} from 'services/api/moradores';
import { ResidenteType } from 'typings/typings';
import { getUniqueKey } from 'utils/HTMLUtils';
/**
 * Tela de Moradores
    - Incluir Novo Morador
    - Tabela de listagem de Moradores (+ Filtros)
        - Nome, 
        - RG, 
        - Nro da casa
    - Marcar Morador como INATIVO (+Modal Confirm)
        (Não pode mais receber entregas, Não pode ser reativado)
    Tela (Modal) de Inclusão de Morador
    - Nome,
    - RG,
    - Seletor de Casa
    - Cada casa pode ter no máximo 8 pessoas ATIVAS
 * @returns 
 */
export default function Moradores() {
  const [moradores, setMoradores] = useState<ResidenteType[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast, openModal, closeModal } = useContext(LayoutContext);
  const [dropOpened, toggleOpened] = useDropOpened<string>();

  const carregar = useCallback(() => {
    setLoading(true);
    getAllMoradores()
      .then((resp) => {
        setMoradores(resp.data);
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
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(() => {
    return [
      { key: 'nome', value: 'Nome', props: { align: 'center' } },
      { key: 'rg', value: 'RG', props: { align: 'center' } },
      { key: 'casaId', value: 'Casa', props: { align: 'center' } },
      { key: 'status', value: 'Status', props: { align: 'center' } },
      { key: 'actions', value: '', props: { align: 'center' } },
    ];
  }, []) as ColumnObject[];

  const lines = useMemo(() => {
    return moradores.map((m, i) => {
      return {
        ...m,
        status: m.status ? 'Ativo' : 'Desativado',
        actions: (
          <DropdownMenu
            opened={dropOpened === m.rg}
            setOpened={() => toggleOpened(m.rg, dropOpened !== m.rg)}
            content={
              <div>
                <DropdownItem
                  label='Desativar'
                  onClick={() => {
                    const modalKey = getUniqueKey();
                    openModal(DestructiveModal, {
                      modalKey,
                      title: 'Desativar Morador',
                      preventMaskExit: true,
                      mobileOnXS: true,
                      children:
                        'Deseja realmente remover este morador? Esta operação não pode ser desfeita.',
                      onClose: () => closeModal(modalKey),
                      onCancel: () => closeModal(modalKey),
                      onConfirm: () =>
                        desativarMorador(m).finally(() => {
                          carregar();
                          closeModal(modalKey);
                        }),
                    });
                  }}
                />
              </div>
            }
          >
            <IconButton
              id={`opcao-${m.id}`}
              disabled={!m.status}
              icon={<OptionsIcon />}
              onClick={() => toggleOpened(m.rg, dropOpened !== m.rg)}
            />
          </DropdownMenu>
        ),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropOpened, moradores]);

  const navigate = useNavigate();
  return (
    <Container position='absolute' verticalPadding>
      <Row>
        <Col>
          <BreadCrumb
            path={[
              { label: 'Início', onClick: () => navigate(Paths.home) },
              { label: 'Moradores' },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Moradores</Title>
        </Col>
      </Row>
      <Row>
        <Col buttonActionsCol end>
          <Button
            id='moradores-adicionar'
            leftIcon={<AddCircleIcon />}
            onClick={() => {
              const modalKey = getUniqueKey();
              openModal(CadastroMoradorModal, {
                modalKey,
                preventMaskExit: true,
                mobileOnXS: true,
                onConfirm: (morador) => {
                  return createMorador(morador)
                    .then(() => {
                      carregar();
                      closeModal(modalKey);
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
                onCancel: () => closeModal(modalKey),
                onClose: () => closeModal(modalKey),
              });
            }}
          >
            Adicionar morador
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <TableWithOverflow
            lines={lines}
            columns={columns}
            showTopNavigator={false}
            noResultMessage='Moradores não encontrados'
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
