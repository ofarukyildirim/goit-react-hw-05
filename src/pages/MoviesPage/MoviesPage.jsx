import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (values) => {
    const query = values.search.trim();

    if (!query) return;

    setSearchParams({ query });
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMovies(query);
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [searchParams]);

  return (
    <div className={css.page}>
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field name="search" placeholder="Search movies..." />
          <button type="submit">Search</button>
        </Form>
      </Formik>

      {loading && <p>Searching...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
