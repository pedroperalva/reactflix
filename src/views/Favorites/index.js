import { useEffect, useState } from "react";
import styles from "./favorites.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const myFavorites = localStorage.getItem("@reactFlix");
    setFavorites(JSON.parse(myFavorites) || []);
  }, []);

  function deleteMovie(id) {
    let filter = favorites.filter((movie) => {
      return movie.id !== id;
    });

    setFavorites(filter);
    localStorage.setItem("@reactFlix", JSON.stringify(filter));
    toast.success("Excluido com sucesso!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const goToMovieInfos = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 style={{ color: "#61dafb", marginBottom: "70px" }}>Meus Favoritos</h1>
      <div className={styles.favoritesContainer}>
        {favorites.map((movie) => {
          return (
            <div className={styles.movieContainer}>
              <div
                className={styles.movie}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                }}
              >
                <p className={styles.title}>{movie.title}</p>
                <div className={styles.btnContainer}>
                  <button
                    className={styles.detailsBtn}
                    onClick={() => goToMovieInfos(movie.id)}
                  >
                    Ver Detalhes
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
