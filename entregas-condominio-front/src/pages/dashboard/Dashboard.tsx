import {
  BreadCrumb,
  Col,
  Container,
  Row,
  Title,
} from 'plataforma-fundacao-componentes';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';

export default function Dashboard() {
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
      <Row></Row>
    </Container>
  );
}
