import Player, { PlayerType } from "./playerFactory";

type ComputerType = ReturnType<typeof createComputerPlayer>;

// Check if ship can be placed horizontally and pass the coordinates and orientation
function getValidHorizontalShipPlacements(
  computer: PlayerType,
  shipLength: number,
  x: number,
  y: number,
  boardSize: number
): Array<[number, number, boolean]> {
  const result: Array<[number, number, boolean]> = [];

  if (y + shipLength <= boardSize) {
    let isValid = true;

    for (let i = 0; i < shipLength; i += 1) {
      if (computer.gameboard.board[x][y + i] !== null) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      result.push([x, y, true]);
    }
  }

  return result;
}

// Check if ship can be placed vertically and pass the coordinates and orientation
function getValidVerticalShipPlacements(
  computer: PlayerType,
  shipLength: number,
  x: number,
  y: number,
  boardSize: number
): Array<[number, number, boolean]> {
  const result: Array<[number, number, boolean]> = [];

  if (x + shipLength <= boardSize) {
    let isValid = true;

    for (let i = 0; i < shipLength; i += 1) {
      if (computer.gameboard.board[x + i][y] !== null) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      result.push([x, y, false]);
    }
  }

  return result;
}

// Get all valid ship placements for a given ship length
function getValidShipPlacements(
  computer: PlayerType,
  shipLength: number,
  boardSize: number
): Array<[number, number, boolean]> {
  const result: Array<[number, number, boolean]> = [];

  for (let x = 0; x < boardSize; x += 1) {
    for (let y = 0; y < boardSize; y += 1) {
      result.push(
        ...getValidHorizontalShipPlacements(
          computer,
          shipLength,
          x,
          y,
          boardSize
        ),
        ...getValidVerticalShipPlacements(computer, shipLength, x, y, boardSize)
      );
    }
  }

  return result;
}

function getAdjacentCells(x: number, y: number) {
  const result: Array<[number, number]> = [];

  if (x - 1 >= 0) {
    result.push([x - 1, y]);
  }

  if (x + 1 < 10) {
    result.push([x + 1, y]);
  }

  if (y - 1 >= 0) {
    result.push([x, y - 1]);
  }

  if (y + 1 < 10) {
    result.push([x, y + 1]);
  }

  return result;
}

function createComputerPlayer() {
  const computer = Player("Computer");

  // Place ships randomly and check if is a valid placement
  function placeShips() {
    computer.ships.forEach((ship) => {
      const validPlacements = getValidShipPlacements(computer, ship.length, 10);
      const [x, y, isHorizontal] =
        validPlacements[Math.floor(Math.random() * validPlacements.length)];
      computer.placeShip(ship, x, y, isHorizontal);
    });
  }

  // Randomly attack enemy's gameboard
  function randomAttack(enemy: PlayerType) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    // Check if coordinates have already been attacked
    while (
      enemy.gameboard.board[x][y] === "miss" ||
      enemy.gameboard.board[x][y] === "hit"
    ) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    computer.attack(x, y, enemy);

    // Pass the x and y coordinates of the attack
    return [x, y];
  }

  let adjacentCells: Array<[number, number]> = [];

  // Attack enemy's gameboard using hunt and parity algorithm
  function smartAttack(enemy: PlayerType): [number, number] {
    // If no adjacent cells, start a new hunt
    if (adjacentCells.length === 0) {
      // Pick a random cell to attack
      const [x, y] = randomAttack(enemy);

      // If the attack was a hit, add the adjacent cells to our list
      if (enemy.gameboard.board[x][y] === "hit") {
        adjacentCells = getAdjacentCells(x, y);
      }

      return [x, y];
    }

    // Get the next adjacent cell
    let coords: [number, number] | undefined = adjacentCells.pop();

    // Check if the adjacent cell has already been attacked
    while (
      coords &&
      (enemy.gameboard.board[coords[0]][coords[1]] === "miss" ||
        enemy.gameboard.board[coords[0]][coords[1]] === "hit")
    ) {
      // If all adjacent cells exhausted, start a new hunt
      if (adjacentCells.length === 0) {
        return smartAttack(enemy);
      }

      coords = adjacentCells.pop();
    }

    // If all adjacent cells exhausted, start a new hunt
    if (!coords) {
      return smartAttack(enemy);
    }

    const [x, y] = coords;

    // Attack the adjacent cell
    computer.attack(x, y, enemy);

    // If the attack was a hit, add the new adjacent cells to our list
    if (enemy.gameboard.board[x][y] === "hit") {
      adjacentCells.push(...getAdjacentCells(x, y));
    }

    return [x, y];
  }

  return {
    ...computer,
    placeShips,
    smartAttack,
    isComputer: true,
  };
}

export type { ComputerType };
export default createComputerPlayer;
