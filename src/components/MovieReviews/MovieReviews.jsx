import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getReviewsById } from '../../movie-api';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        setIsError(false);

        const dataReviews = await getReviewsById(movieId);

        setReviews(dataReviews);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && reviews.length === 0 && (
        <p className={css.textNone}>No reviews available.</p>
      )}
      <ul>
        {reviews.length > 0 &&
          reviews.map(review => (
            <li key={review.id}>
              <div className={css.titleWrapper}>
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                  alt={review.author}
                />
                <h3>{review.author}</h3>
              </div>
              <div className={css.textWrapper}>
                <p>{review.content}</p>
                <p>Rating: {review.author_details.rating}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
