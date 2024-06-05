import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div>
      <p>
        Sorry, page not found! Please go to{' '}
        <Link className={css.link} to="/">
          Home page
        </Link>
        !
      </p>
    </div>
  );
}
