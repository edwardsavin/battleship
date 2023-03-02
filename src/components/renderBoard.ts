// Create 10x10 grid and add coordinates to each cell
function createGridDOM(x: number, y: number, board: HTMLElement) {
  for (let i = 0; i < x; i += 1) {
    for (let j = 0; j < y; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("board__cell");
      cell.setAttribute("data-x", `${i}`);
      cell.setAttribute("data-y", `${j}`);
      board.appendChild(cell);
    }
  }
}

function renderBoard(
  playerName: string,
  shipsReady?: {
    isComputer: boolean;
    name: string;
    coordinates: number[][];
  }[]
) {
  // Filter playerName to have lowercase letters, no spaces and no special characters
  const filteredPlayerName = playerName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const board = document.createElement("div");
  board.classList.add(`board-${filteredPlayerName}`);

  createGridDOM(10, 10, board);

  // Add the player's ships to the board
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
