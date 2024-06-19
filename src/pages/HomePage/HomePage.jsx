import { useState, useEffect } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getMovies } from '../../movie-api';

import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovies();
        console.log(data);
        setMovies(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);
  return (
    <div className={css.container}>
      <h1 className={css.title}>TRENDING MOVIES</h1>
      {isError && <ErrorMessage />}
      {isLoading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
