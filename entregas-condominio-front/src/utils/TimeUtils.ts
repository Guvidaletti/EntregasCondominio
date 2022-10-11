import moment from 'moment';

export const getHumanizedMs = (ms: number) => {
  const duration = moment.duration(ms);
  const s = `${Math.floor(duration.asHours())}h${moment
    .utc(ms)
    .format('mm')} min`;
  return s;
};
