import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingMovies } from '../../api/Api';
import PropTypes from 'prop-types';
import css from '../Home/Home.style.css';

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

  return (
    <>
      <div>
        <h2>Trending movies:</h2>
        <ul>
          {movies.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link to={`movie/${id}`} state={{ from: location }}>
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
