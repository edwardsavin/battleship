import Player, { PlayerType } from "./playerFactory";

type ComputerType = ReturnType<typeof createComputerPlayer>;

// Get all valid ship placements for a given ship length
function getValidShipPlacements(
  computer: PlayerType,
  shipLength: number,
  boardSize: number
): Array<[number, number, boolean]> {
  const result: Array<[number, number, boolean]> = [];

  for (let x = 0; x < boardSize; x += 1) {
    for (let y = 0; y < boardSize; y += 1) {
      // Check if ship can be placed horizontally
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

      // Check if ship can be placed vertically
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
    }
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

  return {
    ...computer,
    placeShips,
    randomAttack,
    isComputer: true,
  };
}

export type { ComputerType };
export default createComputerPlayer;
