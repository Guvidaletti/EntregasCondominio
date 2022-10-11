import styles from './BoxInfo.scss';
const { rootClassName } = styles;

interface BoxInfoProps {
  num: string | number;
  label: string;
}

export default function BoxInfo(props: BoxInfoProps) {
  return (
    <div className={rootClassName}>
      <div className={`${rootClassName}-num`}>{props.num}</div>
      <div className={`${rootClassName}-label`}>{props.label}</div>
    </div>
  );
}
