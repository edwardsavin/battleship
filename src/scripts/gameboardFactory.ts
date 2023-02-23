import { ShipType } from "./shipFactory";

type BoardType = Array<Array<ShipType | null | string>>;

interface GameboardType {
  board: BoardType;
  placeShip: (ship: ShipType, x: number, y: number, direction: string) => void;
  receiveAttack: (x: number, y: number) => void;
}

function Gameboard(): GameboardType {
  // Create board of 10x10
  const board: BoardType = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => null)
  );

  function isShipPlaced(x: number, y: number) {
    return board[x][y] !== null;
  }

  function markHit(x: number, y: number) {
    board[x][y] = "hit";
  }

  function markMiss(x: number, y: number) {
    board[x][y] = "miss";
  }

  function isHit(x: number, y: number) {
    return board[x][y] === "hit";
  }

  // Place ship at coordinates by using Ship factory
  function placeShip(ship: ShipType, x: number, y: number, direction: string) {
    // Check if another ship is already placed at coordinates
    if (isShipPlaced(x, y))
      throw new Error("Ship already placed at coordinates");

    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i += 1) {
        board[x][y + i] = ship;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i += 1) {
        board[x + i][y] = ship;
      }
    }
  }

  // Receive attack at specified coordinates
  function receiveAttack(x: number, y: number) {
    // If ship is already hit at coordinates, return
    if (isHit(x, y)) return;

    // If no ship is placed at coordinates, mark as miss
    if (!isShipPlaced(x, y)) {
      markMiss(x, y);
      return;
    }

    const cell = board[x][y];

    // If ship is placed at coordinates, mark as hit
    if (cell && typeof cell !== "string") {
      cell.hit();
      markHit(x, y);
    }
  }

  return {
    board,
    placeShip,
    receiveAttack,
  };
}

export default Gameboard;
