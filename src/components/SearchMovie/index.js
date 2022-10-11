import styles from "./searchMovie.module.scss";

function SearchMovie(props) {
  const btnStyles = {
    backgroundColor: props.backgroundColor,
    color: props.color,
  };
  return (
    <div className={styles.searchMovie}>
      <input
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChangeInput}
      ></input>
      <button title={props.title} onClick={props.onClickBtn} style={btnStyles}>
        {props.icon}
      </button>
    </div>
  );
}

export default SearchMovie;
