import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Settings()
{
  const location = useLocation();
  const mode = location.state?.mode;
  const navigate = useNavigate();

  const [boardSize, setBoardSize] = useState(3);
  const [winLength, setWinLength] = useState(3);

  function play(boardSize, winLength)
  {
    if (boardSize< winLength)
    {
       alert("Invalid: board size must be >= win condition.");
    }
    else
    {
        console.log(mode, boardSize, winLength);
        navigate("/play-ai", { state: {boardSize, winLength, mode}});
    }
  }

    return <div className="settings">
      <div>
        How big should the board be?      </div>
        <select value={boardSize} onChange={(e) => setBoardSize(Number(e.target.value))}>
          {[3, 4, 5, 6].map(size => (
            <option key={size} value={size}>{size}x{size}</option>
          ))}
        </select>

      <div>
        How many symbols do you need to collect to win? (in a row, column or diagonal)</div>
        <select value={winLength} onChange={(e) => setWinLength(Number(e.target.value))}>
          {[3, 4, 5].map(len => (
            <option key={len} value={len}>{len}</option>
          ))}
        </select>

<br />
      <button onClick= {()=>play(boardSize, winLength)}>
       🎮PLAY!🎮 
      </button>
    </div>

}

export default Settings;