import { useEffect, useState, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import { fetchMovieDetails, IMG_BASE_URL } from "../../api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [movieId]);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div className={css.page}>
      <Link to={backLinkRef.current}>← Go back</Link>

      <div className={css.details}>
        {movie.poster_path && (
          <img
            src={`${IMG_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className={css.poster}
          />
        )}

        <h2>{movie.title}</h2>

        <p>User Score: {Math.round(movie.vote_average * 10)}%</p>

        <h3>Overview</h3>
        <p>{movie.overview}</p>

        <h3>Genres</h3>
        <p>{movie.genres?.map((g) => g.name).join(" ")}</p>
      </div>

      <h3 className={css.additionalTitle}>Additional information</h3>

      <nav className={css.additionalNav}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
