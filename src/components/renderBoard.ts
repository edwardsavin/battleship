function renderBoard(playerName: string) {
  const board = document.createElement("div");
  board.classList.add(`board-${playerName}`);

  // Create 10x10 grid
  for (let i = 0; i < 10 * 10; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("board__cell");
    board.appendChild(cell);
  }

  return board;
}

export default renderBoard;
