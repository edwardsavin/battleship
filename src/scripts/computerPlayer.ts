import Player, { PlayerType } from "./playerFactory";

function createComputerPlayer() {
  const computer = Player("Computer");

  // Place ships randomly
  function placeShips() {
    computer.ships.forEach((ship) => {
      let isHorizontal = Math.random() >= 0.5;
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);

      // Check if ship is already placed at coordinates or if ship is placed out of bounds
      while (
        computer.gameboard.isShipPlaced(x, y) ||
        (isHorizontal && y + ship.length > 10) ||
        (!isHorizontal && x + ship.length > 10)
      ) {
        isHorizontal = Math.random() >= 0.5;
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }

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
  }

  return {
    ...computer,
    placeShips,
    randomAttack,
  };
}

export default createComputerPlayer;
