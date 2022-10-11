import styles from "./circleBtn.module.scss";

function CircleBtn(props) {
  const customStyles = {
    backgroundColor: props.backgroundColor,
    color: props.color,
  };
  return (
    <button
      className={styles.btn}
      title={props.title}
      onClick={props.onClickBtn}
      style={customStyles}
    >
      {props.icon}
    </button>
  );
}

export default CircleBtn;
