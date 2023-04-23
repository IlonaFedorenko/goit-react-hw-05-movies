import axios from 'axios';

const url = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'ddd8814addf1eaac90b3b416df51b9bc',
  },
});

export async function getTrendingMovies() {
  const getUrl = `/trending/movie/week`;
  try {
    const { data } = await url.get(getUrl);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function searchMovies(movieName) {
  const getUrl = `/search/movie`;
  // const getUrl = `/search/movie?query=${movieName}`;
  try {
    const { data } = await url.get(getUrl, { params: { query: movieName } });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailsMovies(id) {
  // const getUrl = `/movie/${id}`;
  const getUrl = `/movie/`;
  try {
    const { data } = await url.get(getUrl, { params: { movie_id: id } });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCreditsMovies() {
  const getUrl = `/movies/get-movie-credits`;
  try {
    const { data } = await url.get(getUrl);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function getReviewsMovies() {
  const getUrl = `/movies/get-movie-reviews`;
  try {
    const { data } = await url.get(getUrl);
    return data.results;
  } catch (error) {
    throw error;
  }
}
