import BoxInfo from 'components/boxInfo/BoxInfo';
import moment from 'moment';
import {
  BreadCrumb,
  Button,
  CloudDownloadIcon,
  Col,
  Container,
  DatePicker,
  Input,
  PercentLoaderIcon,
  Row,
  Title,
  useHTMLShare,
} from 'plataforma-fundacao-componentes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';
import {
  getAllEntregasFiltered,
  getQuantidadeEntregasNaoRetiradas,
  getQuantidadeEntregasUltimosSeteDias,
  getTempoMedioRetiradasEntregas,
} from 'services/api/entregas';
import { formatData } from 'utils/FormatUtils';
import { getHumanizedMs } from 'utils/TimeUtils';
import styles from './Dashboard.scss';
const { rootClassName } = styles;

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

  const [loadingRelatorio, setLoadingRelatorio] = useState(false);

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const navigate = useNavigate();

  const share = useHTMLShare();

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
          <BoxInfo num={qtdNaoRetiradas} label='Entrega(s) não retiradas' />
        </Col>
      </Row>
      <Row>
        <Col cols={[12, 6, 6, 6, 6]}>
          <Input
            id='dataInicio'
            label='Data Início'
            placeholder='DD/MM/YYYY'
            value={dataInicio}
            onChange={(evt) => setDataInicio(formatData(evt.target.value))}
            error={moment(dataFim, 'DD/MM/YYYY').isBefore(
              moment(dataInicio, 'DD/MM/YYYY')
            )}
            rightObject={
              <DatePicker
                queryToAppend='#dataInicio'
                onChange={(date) => setDataInicio(date)}
                closeOnChange
                initialValue={dataInicio}
              />
            }
          />
        </Col>
        <Col cols={[12, 6, 6, 6, 6]}>
          <Input
            id='dataFim'
            label='Data Fim'
            placeholder='DD/MM/YYYY'
            value={dataFim}
            onChange={(evt) => setDataFim(formatData(evt.target.value))}
            error={moment(dataFim, 'DD/MM/YYYY').isBefore(
              moment(dataInicio, 'DD/MM/YYYY')
            )}
            rightObject={
              <DatePicker
                queryToAppend='#dataFim'
                onChange={(date) => setDataFim(date)}
                closeOnChange
                initialValue={dataFim}
              />
            }
          />
        </Col>
      </Row>
      <Row>
        <Col buttonActionsCol end>
          <Button
            disabled={
              loadingRelatorio ||
              !dataInicio ||
              !dataFim ||
              moment(dataFim, 'DD/MM/YYYY').isBefore(
                moment(dataInicio, 'DD/MM/YYYY')
              )
            }
            leftIcon={
              loadingRelatorio ? (
                <PercentLoaderIcon indefinido />
              ) : (
                <CloudDownloadIcon />
              )
            }
            onClick={() => {
              setLoadingRelatorio(true);
              getAllEntregasFiltered({}).then(({ data }) => {
                console.log(data);
                const entregas = data.filter(
                  (e) =>
                    e.dataHora >=
                      moment(dataInicio, 'DD/MM/YYYY').toDate().getTime() &&
                    e.dataHora <=
                      moment(dataFim, 'DD/MM/YYYY').toDate().getTime()
                );
                console.log(entregas);
                const el = (
                  <div className={`${rootClassName}-table-wrapper`}>
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <b>Entrega</b>
                          </th>
                          <th>
                            <b>Data/Hora</b>
                          </th>
                          <th>
                            <b>Descrição</b>
                          </th>
                          <th>
                            <b>Casa</b>
                          </th>
                          <th>
                            <b>Operador</b>
                          </th>
                          <th>
                            <b>Retirada</b>
                          </th>
                          <th>
                            <b>Morador</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {entregas.map((entrega) => {
                          return (
                            <tr key={entrega.id!}>
                              <td>{entrega.id}</td>
                              <td>
                                {moment(entrega.dataHora).format(
                                  'DD/MM/YY HH:mm'
                                )}
                              </td>
                              <td>{entrega.descricao}</td>
                              <td>{entrega.casaId}</td>
                              <td>{entrega.usuario.iniciais}</td>
                              <td>
                                {entrega.retiradas.length
                                  ? moment(
                                      entrega.retiradas[0].dataHora
                                    ).format('DD/MM/YY HH:mm')
                                  : undefined}
                              </td>
                              <td>
                                {entrega.retiradas.length
                                  ? entrega.retiradas[0].residenteId
                                  : undefined}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
                share.print(el).finally(() => {
                  setLoadingRelatorio(false);
                });
              });
            }}
          >
            Baixar Relatório
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
