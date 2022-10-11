import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../services/http";
import styles from "./movie.module.scss";
import Rating from "react-rating";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import BeatLoader from "react-spinners/BeatLoader";
import Modal from "react-modal";
import CircleBtn from "../../components/CircleBtn";
import { toast } from "react-toastify";

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function saveFavorites() {
    const favoriteMovies = localStorage.getItem("@reactFlix");

    let savedMovies = JSON.parse(favoriteMovies) || [];

    const hasMovie = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (hasMovie) {
      toast.error("Já existe nos favoritos!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@reactFlix", JSON.stringify(savedMovies));
    toast.success("Adicionado aos favoritos!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000",
    },
  };

  useEffect(() => {
    const loadMovie = async () => {
      const response = await http.get(`movie/${params.id}`, {
        params: {
          api_key: "1a7819ff802ec84150219ab9b5c40248",
          language: "pt-BR",
          append_to_response: "videos",
        },
      });
      console.log(response.data);
      setMovie(response.data);
      setLoading(false);
    };

    setLoading(true);
    loadMovie();
  }, [params.id]);

  useEffect(() => {}, [movie]);

  return (
    <div
      className={styles.movieContainer}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <BeatLoader color="#61dafb" size={32} />
        </div>
      ) : (
        <div className={styles.infosContainer}>
          <h1 style={{ gridColumn: "span 2" }}>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className={styles.image}
          />
          <div className={styles.infos}>
            <div
              style={{ display: "flex", flexWrap: "wrap", fontSize: "14px" }}
            >
              <p>{movie.release_date} - &nbsp;</p>
              <div className={styles.genres}>
                {movie.genres &&
                  movie.genres.map((genre, i) => {
                    return (
                      <p key={genre.name}>
                        {genre.name}
                        {i === movie.genres.length - 1 ? "" : ","} &nbsp;
                      </p>
                    );
                  })}
                - &nbsp;
              </div>
              <p>{movie.runtime} min</p>
            </div>
            {movie.tagline ? (
              <p style={{ fontStyle: "italic", color: "#ddd" }}>
                {movie.tagline}
              </p>
            ) : (
              <></>
            )}

            <p style={{ fontWeight: "bold" }}>Sinopse:</p>
            <p style={{ fontSize: "15px" }}>{movie.overview}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Avaliação dos usuários:</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Rating
                  start={0}
                  stop={10}
                  initialRating={movie.vote_average}
                  step={2}
                  readonly
                  quiet
                  emptySymbol={<AiFillStar size={24} />}
                  fullSymbol={<AiFillStar color="yellow" size={24} />}
                />
                <p>{parseFloat(movie.vote_average).toFixed(1)}</p>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <CircleBtn
                icon={<BiMoviePlay size={24} />}
                backgroundColor="#61dafb"
                color="#000"
                title="Assistir Trailer"
                onClickBtn={openModal}
              />
              <CircleBtn
                icon={<AiFillHeart size={24} />}
                backgroundColor="#61dafb"
                color="#000"
                title="Adicionar aos Favoritos"
                onClickBtn={saveFavorites}
              />
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="Example Modal"
          >
            {movie.videos?.results.length > 0 ? (
              <iframe
                className={styles.trailer}
                title="Trailer"
                src={`https://www.youtube.com/embed/${movie.videos?.results?.[0].key}`}
              ></iframe>
            ) : (
              <div>
                <h3 style={{ color: "white" }}>Trailer indisponível!</h3>
              </div>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Movie;
