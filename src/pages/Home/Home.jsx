import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingMovies } from '../../api/Api';
import css from '../Home/Home.style.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const movies = await getTrendingMovies();
        setMovies(movies);
        setLoading(false);
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
        {loading
          ? 'Loading...'
          : movies.map(({ title, id }) => (
              <div key={id}>
                <Link
                  to={`/movies/${id}`}
                  state={{ from: location }}
                  className={css.movieItem}
                >
                  {title}
                </Link>
              </div>
            ))}
      </div>
    </>
  );
};

export default Home;
