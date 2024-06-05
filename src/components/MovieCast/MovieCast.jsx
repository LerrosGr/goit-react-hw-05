import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getCastById } from '../../movie-api';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setIsLoading(true);
        setIsError(false);

        const dataCast = await getCastById(movieId);

        setCasts(dataCast);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <p>Loading...</p>}
      <ul className={css.mainList}>
        {casts.length > 0 &&
          casts.map(cast => (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                    : `http://www.suryalaya.org/images/no_image.jpg`
                }
                alt={cast.name}
                width={200}
                height={300}
              />
              <div className={css.wrapperText}>
                <h4>{cast.name}</h4>
                <p>{cast.character}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
