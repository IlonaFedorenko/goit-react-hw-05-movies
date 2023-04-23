import React, { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Link,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { getDetailsMovies } from '../../../api/Api';
import PropTypes from 'prop-types';

function MovieDetails() {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await getDetailsMovies(moviesId);
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [moviesId]);

  if (movies.length === 0) {
    return;
  }

  const { title, overview, genres, poster_path, vote_average } = movies;
  const userScoreNormalized = (vote_average * 10).toFixed();

  const genresPars = genres.map(({ name, id }) => {
    const gens = `${name} `;
    return gens;
  });

  return (
    <>
      <Link to={location.state?.from ?? '/movie'}>Back</Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          alt="Poster"
          height="400"
        />
        <div>
          <h1>{title}:</h1>
          <p>User Score: {userScoreNormalized + '%'} </p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genresPars}</p>
        </div>
      </div>
      <div>
        <h3>Additional iformation</h3>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: location.state?.from }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: location.state?.from }}>
              Reviews
            </NavLink>
          </li>
        </ul>

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

MovieDetails.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      vote_average: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
        PropTypes.exact({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

export default MovieDetails;
