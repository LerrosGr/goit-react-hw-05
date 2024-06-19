import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ol className={css.mainList}>
      {movies.map(movie => (
        <li className={css.listItem} key={movie.id}>
          <div className={css.rating}>4.5</div>
          <Link
            to={`${location.pathname === '/movies' ? '' : 'movies/'}${
              movie.id
            }`}
            state={location}
          >
            <img
              className={css.poster}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : `http://www.suryalaya.org/images/no_image.jpg`
              }
              alt="poster image"
            />
          </Link>

          <Link
            className={css.title}
            to={`${location.pathname === '/movies' ? '' : 'movies/'}${
              movie.id
            }`}
            state={location}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ol>
  );
}
