function renderBoard(playerName: string) {
  const board = document.createElement("div");
  board.classList.add(`board-${playerName}`);

  // Create 10x10 grid and add coordinates to each cell
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("board__cell");
      cell.setAttribute("data-x", `${i}`);
      cell.setAttribute("data-y", `${j}`);
      board.appendChild(cell);
    }
  }

  return board;
}

export default renderBoard;
