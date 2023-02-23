import Gameboard from "./gameboardFactory";
import Ship, { ShipType } from "./shipFactory";

type PlayerType = {
  name: string;
  gameboard: ReturnType<typeof Gameboard>;
  ships: ShipType[];
  placeShip: (
    ship: ShipType,
    x: number,
    y: number,
    isHorizontal: boolean
  ) => void;
  attack: (x: number, y: number, enemy: PlayerType) => void;
};

function Player(name: string) {
  const gameboard = Gameboard();

  const ships = [
    Ship(5, "Carrier"),
    Ship(4, "Battleship"),
    Ship(3, "Destroyer"),
    Ship(3, "Submarine"),
    Ship(2, "Patrol Boat"),
  ];

  function placeShip(
    ship: ShipType,
    x: number,
    y: number,
    isHorizontal: boolean
  ) {
    gameboard.placeShip(ship, x, y, isHorizontal);
  }

  // Attack enemy's gameboard
  function attack(x: number, y: number, enemy: PlayerType) {
    if (
      enemy.gameboard.board[x][y] === "miss" ||
      enemy.gameboard.board[x][y] === "hit"
    ) {
      throw new Error("You have already attacked this coordinate");
    }

    enemy.gameboard.receiveAttack(x, y);
  }

  return {
    name,
    gameboard,
    ships,
    placeShip,
    attack,
  };
}

export type { PlayerType };
export default Player;
