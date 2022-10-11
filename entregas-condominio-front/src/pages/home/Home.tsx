import {
  BigBlockButton,
  BreadCrumb,
  CalendarCheckIcon,
  Col,
  Container,
  HomeIcon,
  PieChartIcon,
  Row,
  Title,
} from 'plataforma-fundacao-componentes';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';

const cols = [12, 6, 6, 4, 4] as any;
/**
Telas
  
  
  Tela Entregas
    - Botão de Registrar Entrega
    - Tabela de Listagem de Entregas (Ordenada por DATA!)
      - Opção de Marcar retirada
    - Filtrar (Não retiradas, Retiradas)
    
  Tela (Modal) Registrar Entrega
    - Data e Hora
    - Descrição
    - Número da casa de destino
    - Usuário que recebeu a entrega
    
  Modal de Registrar Retirada
    - Data e hora,
    - Morador que Retirou (Select +Search)
    - ID da Entrega (Modal)
  
  Tela Dashboard (Pensar em um layout legal)
    - Total de Entregas nos últimos 7 dias
    - Quantidade de Entregas não retiradas (TOTAL)
    - Tempo médio entre Registo e Retirada das entregas.
    - Gerar Relatório:
      - Entre duas datas.
      - Tabela:
          - Entrega (id)
          - Data/Hora (DD/MM/YY HH:mm)
          - Descrição
          - idCasa
          - Operador (Iniciais)
          - Retirada (DD/MM/YY HH:mm) - Ou vazio
          - Morador (Nome) - Ou vazio
          
  
  Tela Admin:
    - Senha para entrar;
    - Excluir um Operador desde que não existam (entregas, retiradas) relacionados a ele
 */
export default function Home() {
  const navigate = useNavigate();
  return (
    <Container position='absolute' verticalPadding>
      <Row>
        <Col>
          <BreadCrumb path={[{ label: 'Início' }]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Início</Title>
        </Col>
      </Row>
      <Row>
        <Col cols={cols}>
          <BigBlockButton
            icon={<CalendarCheckIcon />}
            onClick={() => {
              navigate(Paths.entregas);
            }}
            label='Entregas'
          />
        </Col>
        <Col cols={cols}>
          <BigBlockButton
            icon={<HomeIcon />}
            onClick={() => {
              navigate(Paths.moradores);
            }}
            label='Moradores'
          />
        </Col>
        <Col cols={cols}>
          <BigBlockButton
            icon={<PieChartIcon />}
            onClick={() => {
              navigate(Paths.dashboard);
            }}
            label='Dashboard'
          />
        </Col>
      </Row>
    </Container>
  );
}
