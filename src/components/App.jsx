import { lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

// const Home = lazy(() => import('../pages/Home/Home'));
// const MovieSearch = lazy(() => import('../components/MovieSearch/MovieSearch'));
// const MovieDetails = lazy(() =>
//   import('../pages/Movies/MovieDetails/MovieDetails')
// );
// const Cast = lazy(() => import('../pages/Movies/Cast/Cast'));
// const Reviews = lazy(() => import('../pages/Movies/Reviews/Review'));
// const Layout = lazy(() => import('../components/Layout/Layout'));

import Home from '../pages/Home/Home';
import MovieSearch from './MovieSearch/MovieSearch';
import MovieDetails from '../pages/Movies/MovieDetails/MovieDetails';
import Cast from '../pages/Movies/Cast/Cast';
import Reviews from '../pages/Movies/Reviews/Review';

export const App = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Movies">Movies </NavLink>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieSearch />} />
        {/* <Route path="/movies/:moviesId" element={<MovieDetails />} /> */}
      </Routes>
    </div>
  );
};

// export const App = () => {
//   return (
//     <>
//       <Routes path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         <Route path="/movies" element={<MovieSearch />} />
//         <Route path="movies/:movieId" element={<MovieDetails />}>
//           {/* <Route path="/movies/:cast" element={<Cast />} />
//           <Route path="/movies/:reviews" element={<Reviews />} /> */}
//         </Route>
//         <Route path="*" element={<Home />} />
//       </Routes>
//     </>
//   );
// };
