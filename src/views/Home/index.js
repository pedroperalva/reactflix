import { useEffect, useState } from "react";
import http from "../../services/http";
import styles from "./home.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import SearchMovie from "../../components/SearchMovie";
import { AiOutlineSearch } from "react-icons/ai";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function handleValue(event) {
    setValue(event.target.value);
  }

  async function searchMovie() {
    try {
      const response = await http.get("search/movie/", {
        params: {
          api_key: "1a7819ff802ec84150219ab9b5c40248",
          language: "pt-BR",
          query: value,
        },
      });
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      navigate(`/error`);
    }
  }

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const response = await http.get("movie/now_playing", {
          params: {
            api_key: "1a7819ff802ec84150219ab9b5c40248",
            language: "pt-BR",
            page: 1,
          },
        });
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        navigate(`/error`);
      }
    };
    if (location.state) {
      console.log("oi");
      setMovies(location.state);
    } else {
      loadMovies();
    }
  }, [location, navigate]);

  const goToMovieInfos = (id) => {
    console.log(id);
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    if (movies.length === 1) {
      console.log("oi");
      navigate(`/movie/${movies[0]?.id}`);
    }
  }, [movies, navigate]);

  return (
    <div className={styles.homeContainer}>
      {isLoading ? (
        <div className={styles.loading}>
          <BeatLoader color="#61dafb" size={32} />
        </div>
      ) : (
        <div className={styles.homeContent}>
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
          <h1>
            Busque filmes, veja os detalhes, assista aos trailers e salve seus
            favoritos!
          </h1>
          <div className={styles.moviesContainer}>
            {movies.map((movie) => {
              return (
                <article
                  className={styles.movieContainer}
                  onClick={() => goToMovieInfos(movie.id)}
                  key={movie.id}
                >
                  <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className={styles.titleContainer}>
                    <h3>{movie.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
