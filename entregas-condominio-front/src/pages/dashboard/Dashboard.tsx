import BoxInfo from 'components/boxInfo/BoxInfo';
import {
  BreadCrumb,
  CardTypes,
  Col,
  Container,
  Row,
  Title,
} from 'plataforma-fundacao-componentes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';
import {
  getQuantidadeEntregasNaoRetiradas,
  getQuantidadeEntregasUltimosSeteDias,
  getTempoMedioRetiradasEntregas,
} from 'services/api/entregas';
import { getHumanizedMs } from 'utils/TimeUtils';

export default function Dashboard() {
  const [qtdEntregas, setQtdEntregas] = useState<string | number>(
    'Carregando...'
  );

  const [tempoMedio, setTempoMedio] = useState<string | number>(
    'Carregando...'
  );

  const [qtdNaoRetiradas, setQtdNaoRetiradas] = useState<string | number>(
    'Carregando...'
  );

  useEffect(() => {
    getQuantidadeEntregasUltimosSeteDias()
      .then((resp) => {
        setQtdEntregas(resp);
      })
      .catch(() => {
        setQtdEntregas('...');
      });
    getTempoMedioRetiradasEntregas()
      .then((resp) => {
        setTempoMedio(resp);
      })
      .catch(() => {
        setTempoMedio('...');
      });
    getQuantidadeEntregasNaoRetiradas()
      .then((resp) => setQtdNaoRetiradas(resp))
      .catch(() => setQtdNaoRetiradas('...'));
  }, []);

  const navigate = useNavigate();
  return (
    <Container position='absolute' verticalPadding>
      <Row>
        <Col>
          <BreadCrumb
            path={[
              { label: 'Início', onClick: () => navigate(Paths.home) },
              { label: 'Dashboard' },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Dashboard</Title>
        </Col>
      </Row>
      <Row>
        <Col cols={[12, 6, 4, 4, 4]}>
          <BoxInfo num={qtdEntregas} label='Entrega(s) nos últimos 7 dias' />
        </Col>
        <Col cols={[12, 6, 4, 4, 4]}>
          <BoxInfo
            num={`${
              typeof tempoMedio === 'number'
                ? getHumanizedMs(tempoMedio)
                : tempoMedio
            }`}
            label='Tempo médio de entrega'
          />
        </Col>
        <Col cols={[12, 12, 4, 4, 4]}>
          <BoxInfo
            num={qtdNaoRetiradas}
            label='Entrega(s) não retiradas'
          />
        </Col>
      </Row>
    </Container>
  );
}
