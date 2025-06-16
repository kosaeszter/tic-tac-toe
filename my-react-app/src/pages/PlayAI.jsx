import Board from "../components/Board/Board";

function PlayAI() {
  return <Board matrix={[["", "", "", "x"],["o", "x", "o", "x"], ["o", "x", "o", "x"], ["o", "x", "o", "x"]]} dimension={4}></Board>
}

export default PlayAI