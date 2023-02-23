import { describe, it, expect } from "vitest";
import Player from "../scripts/playerFactory";

describe("Player", () => {
  it("should place ships on the gameboard", () => {
    const playerOne = Player("Player 1");
    const carrier = playerOne.ships[0];
    playerOne.placeShip(carrier, 0, 0, true);
    expect(playerOne.gameboard.board[0][0]).toBe(carrier);
  });

  it("should throw an error if the ship is placed on top of another ship", () => {
    const playerOne = Player("Player 1");
    const carrier = playerOne.ships[0];
    const battleship = playerOne.ships[1];
    playerOne.placeShip(carrier, 0, 0, true);
    expect(() => playerOne.placeShip(battleship, 0, 0, true)).toThrow();
  });

  it("should attack enemy's gameboard", () => {
    const playerOne = Player("Player 1");
    const playerTwo = Player("Player 2");
    const carrier = playerOne.ships[0];
    playerOne.placeShip(carrier, 0, 0, true);
    playerTwo.attack(0, 0, playerOne);
    expect(playerOne.gameboard.board[0][0]).toBe("hit");
  });

  it("should throw an error if the specific coordinate has already been hit", () => {
    const playerOne = Player("Player 1");
    const playerTwo = Player("Player 2");
    const carrier = playerOne.ships[0];
    playerOne.placeShip(carrier, 0, 0, true);
    playerTwo.attack(0, 0, playerOne);
    expect(() => playerTwo.attack(0, 0, playerOne)).toThrow();
  });

  it("should throw an error if the specific coordinate has already been missed", () => {
    const playerOne = Player("Player 1");
    const playerTwo = Player("Player 2");
    const carrier = playerOne.ships[0];
    playerOne.placeShip(carrier, 0, 0, true);
    playerTwo.attack(1, 1, playerOne);
    expect(() => playerTwo.attack(1, 1, playerOne)).toThrow();
  });

  it("should return true if all ships are sunk", () => {
    const playerOne = Player("Player 1");
    const playerTwo = Player("Player 2");
    const carrier = playerOne.ships[0];
    playerOne.placeShip(carrier, 0, 0, true);
    playerTwo.attack(0, 0, playerOne);
    playerTwo.attack(0, 1, playerOne);
    playerTwo.attack(0, 2, playerOne);
    playerTwo.attack(0, 3, playerOne);
    playerTwo.attack(0, 4, playerOne);
    expect(playerOne.gameboard.checkIfAllShipsSunk()).toBe(true);
  });
});
