import "./style.css";
import Gameboard from "./scripts/gameboardFactory";
import Ship from "./scripts/shipFactory";

const gameboard = Gameboard();
const cruiser = Ship(3, "Cruiser");
const submarine = Ship(3, "Submarine");
gameboard.placeShip(cruiser, 0, 0, "horizontal");
gameboard.placeShip(submarine, 1, 0, "horizontal");
gameboard.receiveAttack(0, 0);
gameboard.receiveAttack(0, 1);
gameboard.receiveAttack(0, 2);
gameboard.receiveAttack(1, 0);
gameboard.receiveAttack(1, 1);
gameboard.receiveAttack(1, 2);

console.table(gameboard.board);
console.log(gameboard.checkIfAllShipsSunk());
