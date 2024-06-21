import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getMoviesByQuery } from '../../movie-api';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import css from './MoviePage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const movieSearch = searchParams.get('title') ?? '';
    if (movieSearch) {
      setQuery(movieSearch);
      handleSearch(movieSearch);
    }
  }, [searchParams]);

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  const handleSearch = async query => {
    setIsLoading(true);
    setIsError(false);
    setHasSearched(true);

    try {
      const data = await getMoviesByQuery(query);
      setMovies(data);
      setQuery('');
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (query === '') {
      toast.error('Please fill in the field', {
        duration: 2000,
        position: 'top-left',
      });
      return;
    }
    setSearchParams({ title: query });
    setMovies([]);
    handleSearch(query);
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="title"
          value={query}
          onChange={handleChange}
          placeholder="Find your movie..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      <Toaster />
      {isError && <ErrorMessage />}
      {isLoading && <p className={css.load}>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && hasSearched && !isLoading && (
        <p className={css.error}>No movies found.</p>
      )}
    </div>
  );
}
