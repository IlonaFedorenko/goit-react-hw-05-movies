import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { searchMovies } from '../../api/Api';

import css from './MovieSearch.style.css';

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSerchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [query, setQuery] = useState(() => searchQuery || '');

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const { results } = await searchMovies(searchQuery);
        setMovies(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
        ></input>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>

      <ul className={css.list}>
        {searchQuery ? (
          loading ? (
            'Loading...'
          ) : movies.length > 0 ? (
            movies.map(({ title, id }) => (
              <li key={id} className={css.listItem}>
                <Link state={{ from: location }} to={`/movies/${id}`}>
                  {title}
                </Link>
              </li>
            ))
          ) : (
            <p>
              No movies with this title were found. Try entering another title
            </p>
          )
        ) : (
          <p className={css.descr}></p>
        )}
      </ul>
    </>
  );
};

export default MovieSearch;
