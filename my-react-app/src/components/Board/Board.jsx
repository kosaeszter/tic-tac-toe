import { useState } from "react";
import "./Board.css";
import { useEffect } from "react";
import { randomAiCoord, isBoardFull, updateBoard, checkBoardIsWon, aiCoordsFullBoard } from "../../utils/boardplay";
import { useNavigate } from "react-router-dom";

function Board({ matrix, dimension, winLength, mode }) {

  let [board, setBoard] = useState(matrix);
  let [message, setMessage] = useState("Welcome!");
  let [isRunning, setIsRunning] = useState(true);
  let [winner, setWinner] = useState(null);

  const navigate = useNavigate();

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

  function tie(newBoard) {
    setMessage("It's a tie!");
    setIsRunning(false);
    setBoard(newBoard);
  }

  function win(newBoard, currentIndex) {
    setWinner(playerMark[currentIndex]);
    setMessage(`${playerMark[currentIndex]} won!`);
    setIsRunning(false);
    setBoard(newBoard);
  }


  function play(x, y) {
    if (!isRunning || board[x][y] !== " ") return;

    const newBoard = board.map(row => [...row]);
    let currentIndex = playerIndex;

    if (whoPlays[currentIndex] === "human") {
      newBoard[x][y] = playerMark[currentIndex];

      if (checkBoardIsWon(newBoard, N, n, playerMark[currentIndex])) {
        win(newBoard, currentIndex);
        return;
      }
      if (isBoardFull(newBoard)) {
        tie(newBoard);
        return;
      }
      currentIndex = (currentIndex + 1) % 2;

      if (whoPlays[currentIndex] === "ai") {
        let aiCoord = aiCoordsFullBoard(newBoard, N, n, playerMark[currentIndex]);
        if (!aiCoord) {
          aiCoord = aiCoordsFullBoard(newBoard, N, n, playerMark[(currentIndex + 1) % 2]);
        }
        if (!aiCoord) {
          aiCoord = randomAiCoord(newBoard, N, playerMark[currentIndex]);
        }

        newBoard[aiCoord[0]][aiCoord[1]] = playerMark[currentIndex];

        if (checkBoardIsWon(newBoard, N, n, playerMark[currentIndex])) {
          win(newBoard, currentIndex);
          return;
        }

        if (isBoardFull(newBoard)) {
          tie(newBoard);
          return;
        }
        currentIndex = (currentIndex + 1) % 2;
      }

      setMessage(`Player ${playerMark[currentIndex]}'s turn`);
      setPlayerIndex(currentIndex);
      setBoard(newBoard);
    }
  }


  useEffect(() => {
    if (!isRunning) {
      return;
    } else {
      if (checkBoardIsWon(board, N, n, playerMark[(playerIndex + 1) % 2])) {
        setMessage(`${playerMark[(playerIndex + 1) % 2]} won!`);
        setWinner(playerMark[(playerIndex + 1) % 2]);
        setIsRunning(false);
      } else if (isBoardFull(board)) {
        setMessage("It's a tie!");
        setIsRunning(false);
      } else {
        setMessage(`Player ${playerMark[playerIndex]}'s turn`);
      }
    }

  }, [board]);

  return (
    <>
      <div className="msg">{message}</div>
      <div className="board-wrapper">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => (
                <button
                  disabled={cell === "X" || cell == "O"}
                  key={cellIndex}
                  onClick={() => play(rowIndex, cellIndex)}
                  className={`
                    ${winner == "O" ? "aqua-glow " : ""}
                    ${winner == "X" ? "red-glow " : ""}
                    cell ${cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""}
                    `}
                >
                  {cell}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <button className="home-btn" onClick={() => { navigate("/"); setPlayerIndex(0) }}>🏡 Home</button>
        <button className="play-again-btn" onClick={() => {
          setBoard(matrix);
          setWinner(null);
          setIsRunning(true);
        }
        }> 🔁 Restart</button>
        <button className="settings-btn" onClick={() => { navigate("/settings", {state: { mode: mode }}) }}>⚙️Settings</button>
      </div>
    </>);

}

export default Board;
