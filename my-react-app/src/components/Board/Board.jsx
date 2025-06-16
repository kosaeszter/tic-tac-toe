import { useState } from "react";
import "./Board.css";
import { useEffect } from "react";
import { randomAiCoord, isBoardFull, updateBoard, checkBoardIsWon, aiCoordsFullBoard } from "../../utils/boardplay";

function Board({ matrix, dimension, winLength, mode }) {
  console.log("matrix:", matrix);
  let [board, setBoard] = useState(matrix);
  let [message, setMessage] = useState("Welcome!");
  let [isActiveGame, setIsActiveGame]= useState( true);

  let N = dimension;
  let n = winLength;

  let whoPlays;
  if (mode == "ai") {
    whoPlays = ["human", "ai"];
  } else {
    whoPlays = ["human", "human"];
  }

  

  const playerMark = ["X", "O"];
  const [playerIndex, setPlayerIndex] = useState(0);

  function humanPlay(x, y) {
    if (board[x][y] == " ") {
      const newBoard = board.map(row => [...row]);
      newBoard[x][y] = playerMark[playerIndex];
      setBoard(newBoard);
    }
  }


  function aiPlay() {
    let chosenCoord = aiCoordsFullBoard(board, N, n, playerMark[playerIndex]);
    if (!chosenCoord) {
      chosenCoord = aiCoordsFullBoard(board, N, n, playerMark[(playerIndex + 1) % 2]);
    }
    if (!chosenCoord) {
      chosenCoord = randomAiCoord(board, N, playerMark[playerIndex]);
    }
    const newBoard = board.map(row => [...row]); 
    newBoard[chosenCoord[0]][chosenCoord[1]] = playerMark[playerIndex];
    setBoard(newBoard);
  }


  function checkWin() {
    console.log(board, N, n, playerMark[playerIndex]);
    if (checkBoardIsWon(board, N, n, playerMark[playerIndex])) {
      setIsActiveGame(false);
      setMessage(`${playerMark[playerIndex]} won!`);
    }
  }

function play(x, y) {
  if (board[x][y] !== " ") return;

  if (whoPlays[playerIndex] === "human") {
    humanPlay(x, y);
    setPlayerIndex((playerIndex + 1) % 2);
  }
}

useEffect(() => {
  if (whoPlays[playerIndex] === "ai") {
    const timer = setTimeout(() => {
      aiPlay();
      setPlayerIndex((playerIndex + 1) % 2);
    }, 300);
    return () => clearTimeout(timer);
  }
}, [playerIndex]);

useEffect(() => {
  if (checkBoardIsWon(board, N, n, playerMark[(playerIndex + 1) % 2])) {
    setMessage(`${playerMark[(playerIndex + 1) % 2]} won!`);
  } else if (isBoardFull(board)) {
    setMessage("It's a tie!");
  } else {
    setMessage(`Player ${playerMark[playerIndex]}'s turn`);
  }
}, [board]);

  return (
    <>
      <div>{message}</div>
      <div className="board-wrapper">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => (
                <button
                disabled={cell === "X" || cell == "O"}
                  key={cellIndex}
                  onClick={() => play(rowIndex, cellIndex)}
                  className={`cell ${cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""}`}
                >
                  {cell}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>);

}

export default Board;
