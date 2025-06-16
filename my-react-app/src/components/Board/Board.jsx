import "./Board.css";

function Board({ matrix, dimension }) {
  return (
     <div className="board-wrapper">
    <div className="board">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <>
              <div key={cellIndex}  className={`cell ${cell === "x" ? "x-cell" : cell === "o" ? "o-cell" : ""}`}>
              {row[cellIndex]}
              {
                console.log(rowIndex,cellIndex, cell)
              }
            </div>   
            </>
          ))}
        </div>
      ))}
    </div>
      </div>
  );

}

export default Board;
