import { useState } from "react";
import Board from "../components/Board/Board";
import { useLocation } from "react-router-dom";
import { getEmptyBoard } from '../utils/boardplay';

function PlayAI() {

    const location = useLocation();
    const boardSize = location.state?.boardSize;
    const winLength = location.state?.winLength;
    const mode= location.state?.mode;

  return<> 
  <Board matrix={getEmptyBoard(boardSize)} 
           dimension={boardSize} 
            winLength={winLength} 
          mode={mode}>
          </Board>
  </> 
}

export default PlayAI