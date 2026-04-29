import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast, IMG_BASE_URL } from "../../api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No cast information</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id}>
          {actor.profile_path && (
            <img
              src={`${IMG_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              className={css.photo}
            />
          )}
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
