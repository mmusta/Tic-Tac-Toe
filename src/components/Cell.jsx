import './styles.css';

function Cell({ value, handleClick }) {
  return (
    <span className="cell" onClick={handleClick}>
      {value}
    </span>
  );
}

export default Cell;
