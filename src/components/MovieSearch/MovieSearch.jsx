import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { searchMovies } from '../../api/Api';

import css from './MovieSearch.style.css';

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSerchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [query, setQuery] = useState(() => searchQuery || '');

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results } = await searchMovies(searchQuery);
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchQuery) {
      getMovies();
    }
  }, [searchQuery]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handelSubmit = e => {
    e.preventDefault();
    setSerchParams({ query: query });
    setQuery('');
  };

  return (
    <>
      <form className={css.form} onSubmit={handelSubmit}>
        <input
          onChange={handleChange}
          className={css.input}
          type="text"
          name="search"
          value={query}
          placeholder="Search movie"
          autoComplete="off"
          autoFocus
        ></input>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>

      <ul className={css.list}>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieSearch;
