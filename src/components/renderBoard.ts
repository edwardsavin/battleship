function renderBoard(
  playerName: string,
  shipsReady?: {
    isComputer: boolean;
    name: string;
    coordinates: number[][];
  }[]
) {
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

  // Add the computer's ships to the board
  if (shipsReady) {
    shipsReady.forEach((ship) => {
      ship.coordinates.forEach((coordinate) => {
        const cell = board.querySelector(
          `[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`
        );

        // Only add the ship class and attribute to the player's board
        if (cell && !ship.isComputer) {
          cell.classList.add("ship");
          cell.setAttribute("data-ship", `${ship.name}`);
        }
      });
    });
  }

  return board;
}

export default renderBoard;
