import { useState } from 'react';
import Cell from './Cell';
import './styles.css';

const range = (size) => Array(size).fill(null);
function Board() {
  const [cells, setCells] = useState(range(9));
  const [history, setHistory] = useState([[...cells]]);

  const findIsWin = () => {
    const winCellIndexTupleList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const findIfAllTupleIndicesHaveSamePlayer = (
      indicesTuple,
    ) => indicesTuple.every((index) => Boolean(cells[index]))
      && cells[indicesTuple[0]] === cells[indicesTuple[1]]
      && cells[indicesTuple[1]] === cells[indicesTuple[2]];
    return winCellIndexTupleList.reduce(
      (acc, indicesTuple) => acc || findIfAllTupleIndicesHaveSamePlayer(indicesTuple),
      false,
    );
  };
  const getCurrentPlayer = () => (history.length % 2 ? 'O' : 'X');
  const getWinner = () => (history.length % 2 ? 'X' : 'O');
  const getCellClickHandler = (cellIndex) => () => {
    if (findIsWin() || cells[cellIndex]) {
      return;
    }
    const updatedCells = cells.map((cell, index) => (index === cellIndex ? getCurrentPlayer() : cell
    ));
    setHistory([...history, updatedCells]);
    setCells(updatedCells);
  };
  return (
    <main className="board">
      <div>
        {range(3).map((_, outerIndex) => (
          <div key={outerIndex.id} className="row">
            {range(3).map((__, innerIndex) => (
              <Cell
                key={innerIndex.id}
                handleClick={getCellClickHandler(outerIndex * 3 + innerIndex)}
                value={cells[outerIndex * 3 + innerIndex]}
              />
            ))}
          </div>
        ))}
        <div className="result">{ (findIsWin() && `${getWinner()} won`) || (history.length === 10 && 'Draw') }</div>
      </div>
      <div className="hs" />
      <div>
        {history.map((pastBoard, index) => (
          <button
            key={index.id}
            onClick={() => {
              setHistory(history.slice(0, index + 1));
              setCells(pastBoard);
            }}
            className="button"
            type="button"
          >
            Go to Move#
            {index}
          </button>
        ))}
      </div>
    </main>
  );
}
export default Board;
