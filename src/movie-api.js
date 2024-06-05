import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const ACCESS_KEY = '12a2bfeaa8107f0eea665deea0e94e02';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmEyYmZlYWE4MTA3ZjBlZWE2NjVkZWVhMGU5NGUwMiIsInN1YiI6IjY2NWVlYjkzMmIxMTE2MmQxOGYzZTAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qx3J15jipboz8xfU_-rvDkbSg1WSAPr7yl9XjK0q0vc',
  },
  params: {
    api_key: `${ACCESS_KEY}`,
  },
};

export const getMovies = async () => {
  const response = await axios.get('/trending/movie/day', options);
  return response.data.results;
};

export const getMoviesByQuery = async query => {
  const response = await axios.get(`/search/movie`, {
    ...options,
    params: {
      api_key: ACCESS_KEY,
      query: query,
    },
  });
  return response.data.results;
};

export const getMovieById = async movieId => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const getCastById = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getReviewsById = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data.results;
};
