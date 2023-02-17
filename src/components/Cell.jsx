import './styles.css';
import PropTypes from 'prop-types';

function Cell({ value, handleClick }) {
  return (
    <span tabIndex={0} role="button" className="cell" onClick={handleClick} onKeyDown={() => {}}>
      {value}
    </span>
  );
}

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Cell;
