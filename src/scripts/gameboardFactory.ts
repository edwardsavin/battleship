import { ShipType } from "./shipFactory";

function Gameboard() {
  // Create board of 10x10
  const board = Array(10).fill(Array(10).fill(null));

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

    // Check if ship is placed at coordinates
    if (isShipPlaced(x, y)) {
      board[x][y].hit();
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
