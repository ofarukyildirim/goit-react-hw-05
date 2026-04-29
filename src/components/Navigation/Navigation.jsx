import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const getClassName = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={getClassName}>
        Home
      </NavLink>

      {" | "}

      <NavLink to="/movies" className={getClassName}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
