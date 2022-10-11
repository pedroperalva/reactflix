import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import SearchMovie from "../SearchMovie";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../services/http";

function Header() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  function handleValue(event) {
    setValue(event.target.value);
  }

  async function searchMovie() {
    console.log(value);
    try {
      const response = await http.get("search/movie/", {
        params: {
          api_key: "1a7819ff802ec84150219ab9b5c40248",
          language: "pt-BR",
          query: value,
        },
      });

      setMovies(response.data.results);
    } catch (error) {
      navigate(`/error`);
    }
  }

  useEffect(() => {
    if (movies.length > 1) {
      navigate(`/`, {
        state: movies,
      });
      setMovies([]);
    }

    if (movies.length === 1) {
      navigate(`/movie/${movies[0]?.id}`);
      setMovies([]);
    }
  }, [movies, navigate]);

  return (
    <header>
      <Link className={styles.title} to="/">
        REACTFLIX
      </Link>
      <div className={styles.searchMovie}>
        <SearchMovie
          placeholder="Buscar Filme"
          icon={<AiOutlineSearch size={24} />}
          title="Buscar"
          value={value}
          onChangeInput={handleValue}
          onClickBtn={searchMovie}
        />
      </div>
      <Link className={styles.links} to="/favorites">
        Meus Favoritos
      </Link>
    </header>
  );
}

export default Header;
