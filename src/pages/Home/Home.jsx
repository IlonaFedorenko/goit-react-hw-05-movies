import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingMovies } from '../../api/Api';
import PropTypes from 'prop-types';
import css from './Home.module.css';
import noPoster from '../../img/noPoster.jpg';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  const { poster_path } = movies;

  return (
    <>
      <div>
        <h2 className={css.text}>Trending movies:</h2>
        <ul className={css.list}>
          {movies.map(({ id, title }) => {
            return (
              <li key={id} className={css.item}>
                <img
                  className={css.img}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : noPoster
                  }
                  alt="Poster"
                  height="400"
                />
                <Link
                  className={css.link}
                  to={`movies/${id}`}
                  state={{ from: location }}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

Home.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default Home;
