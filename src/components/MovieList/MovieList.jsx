import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ol>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link
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
