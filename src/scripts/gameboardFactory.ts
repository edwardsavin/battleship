import { ShipType } from "./shipFactory";

function Gameboard() {
  // Create board of 10x10
  const board = Array(10).fill(Array(10).fill(null));

  // Check if ship is placed at coordinates
  function isShipPlaced(x: number, y: number) {
    return board[x][y] !== null;
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

  return {
    board,
    placeShip,
  };
}

export default Gameboard;
