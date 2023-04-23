import React, { useParams, useState, useEffect, Suspense } from 'react';
import { NavLink, Link, useLocation, Outlet } from 'react-router-dom';
import { getDetailsMovies } from '../../../api/Api';
import PropTypes from 'prop-types';

import css from '../MovieDetails/MovieDetails.style.css';

function MovieDetails() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await getDetailsMovies(movieId);
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [movieId]);

  if (movies === null) {
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
      <Link to={location.state?.from ?? '/movie'} className={css.back}>
        Back
      </Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          alt="Poster"
          height="500"
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
        <ul className={css.list}>
          <NavLink
            to="casts"
            state={{ from: location.state?.from }}
            className={({ isActive }) =>
              isActive ? css.navLinkActive : css.navLink
            }
          >
            Casts
          </NavLink>
          <NavLink
            to="reviews"
            state={{ from: location.state?.from }}
            className={({ isActive }) =>
              isActive ? css.navLinkActive : css.navLink
            }
          >
            Reviews
          </NavLink>
        </ul>

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default MovieDetails;
