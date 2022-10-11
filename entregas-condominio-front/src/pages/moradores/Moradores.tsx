import {
  BreadCrumb,
  Col,
  Container,
  Row,
  Title,
} from 'plataforma-fundacao-componentes';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';
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
      <Row></Row>
    </Container>
  );
}
