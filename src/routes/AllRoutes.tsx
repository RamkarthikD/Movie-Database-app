import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { MovieDetails, MovieList } from "../pages";
import LoginSignup from "../pages/Login";
import Mainpage from "../pages/MainPage";
import Recipe from "../pages/Recipe";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const movieRoutes = [
  { path: "/dashboard", title: "Your Guide to Great Movies", apiPath: "movie/now_playing" },
  { path: "/movies/popular", title: "Popular Movies", apiPath: "movie/popular" },
  { path: "/movies/top", title: "Top Rated Movies", apiPath: "movie/top_rated" },
  { path: "/movies/upcoming", title: "Upcoming Movies", apiPath: "movie/upcoming" },
];

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/signup" element={<LoginSignup />} />

      <Route element={<ProtectedRoute />}>
        {movieRoutes.map(({ path, title, apiPath }) => (
          <Route
            key={path}
            path={path}
            element={<MovieList title={title} apiPath={apiPath} />}
          />
        ))}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/food" element={<Mainpage />} />
        <Route path="/meal/:id" element={<Recipe />} />


      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AllRoutes;
