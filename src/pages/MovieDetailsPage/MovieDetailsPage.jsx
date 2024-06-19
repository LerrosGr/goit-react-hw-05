import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useState, useRef, Suspense } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getMovieById } from '../../movie-api';

import css from './MovieDetailsPage.module.css';

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();

  const goBack = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getMovieById(movieId);

        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      <Link to={goBack.current} className={css.linkBack}>
        Go back
      </Link>
      {isError && <ErrorMessage />}
      {isLoading && <p>Loading...</p>}

      {movie && (
        <div className={css.wrapper}>
          <div>
            <h2 className={css.mainTitle}>{movie.title}</h2>
            <h3 className={css.titleItem}>Overview:</h3>
            <p className={css.text}>{movie.overview}</p>
          </div>
          <img
            className={css.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : `http://www.suryalaya.org/images/no_image.jpg`
            }
            alt="Poster"
          />

          <ul className={css.list}>
            <li className={css.titleItem}>
              Vote-average: {movie.vote_average}/10
            </li>
            <li className={[css.titleItemGenres]}>Genres:</li>
            <li className={css.genres}>
              {movie.genres.map(genre => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </li>
          </ul>
        </div>
      )}
      {!isLoading && !isError && (
        <ul className={css.navDetails}>
          <li>
            <NavLink className={getLinkClass} to="cast">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkClass} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
      )}
      <Suspense fallback={<div>Loading details...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
