import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../api";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  if (loading) return <p>Loading trending movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location.pathname + location.search }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
