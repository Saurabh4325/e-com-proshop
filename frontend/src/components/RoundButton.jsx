import "../css/components.css";

const RoundButton = ({ text, icon, theme = "light", classes, onClick }) => {
  return (
    <button
      className={`btn btn--round btn--${theme} ${classes}`}
      onClick={onClick}
    >
      <div>{text}</div>
      <div className="btn--round-icon icon--sm">{icon}</div>
    </button>
  );
};

export default RoundButton;
