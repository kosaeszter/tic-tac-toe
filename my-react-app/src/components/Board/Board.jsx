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

  function humanPlay(x, y) {
    if (!isRunning) {
      return;
    }
    if (board[x][y] == " ") {
      const newBoard = board.map(row => [...row]);
      newBoard[x][y] = playerMark[playerIndex];
      setBoard(newBoard);
    }
  }


  function aiPlay() {
    if (!isRunning) {
      return;
    } else {
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
  }

  function checkWin() {
    console.log(board, N, n, playerMark[playerIndex]);
    if (checkBoardIsWon(board, N, n, playerMark[playerIndex])) {
      setIsRunning(false);
      setWinner(playerMark[playerIndex]);
      setMessage(`${playerMark[playerIndex]} won!`);
      navigate("/end-of-the-game");
    }
  }

  function play(x, y) {
    if (!isRunning) {
      return;
    }

    //checkwin()

    if (board[x][y] !== " ") return;

    if (whoPlays[playerIndex] == "human") {
      humanPlay(x, y);
      setPlayerIndex((playerIndex + 1) % 2);

      // PREFER LOCAL VARIABLES
      //copy board to a local variable => boardlocal
      // checkwin()

      // if win => return 
      
      //else{
       // aiplay() 
       //  setPlayerIndex((playerIndex + 1) % 2);
       // setBoard

       //setBoard(boardlocal)
    //}

    }
  }

 /* useEffect(() => {
    if (whoPlays[playerIndex] === "ai") {
      if (!isRunning) {
        return;
      }
      const timer = setTimeout(() => {
        aiPlay();
        setPlayerIndex((playerIndex + 1) % 2);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [playerIndex]);*/ 

  useEffect(() => {
    if (!isRunning) {
      return;
    } 

    else {
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
      <button className="home-btn" onClick={()=>navigate("/")}>🏡 Home</button>
      <button className="play-again-btn" onClick={()=>
        {setBoard(matrix);
          setWinner(null);
          setIsRunning(true);
        }
        }> 🔁 Restart</button>
      <button className="settings-btn" onClick={()=>navigate("/settings")}>⚙️Settings</button>
      </div>
    </>);

}

export default Board;
