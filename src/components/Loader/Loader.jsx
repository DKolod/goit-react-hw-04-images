import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.BoxLoader}>
      <ThreeCircles color="#00ff00" height={150} width={150} />
    </div>
  );
}
