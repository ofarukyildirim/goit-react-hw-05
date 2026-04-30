import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className={css.container}>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
