import { describe, it, expect } from "vitest";
import Gameboard from "../scripts/gameboardFactory";
import Ship from "../scripts/shipFactory";

describe("Gameboard", () => {
  it("should place ship at correct coordinates on horizontal", () => {
    const gameboard = Gameboard();
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(submarine, 0, 0, true);
    expect(gameboard.board[0][0]).toBe(submarine);
  });

  it("should place ship at correct coordinates on vertical", () => {
    const gameboard = Gameboard();
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(submarine, 0, 0, false);
    expect(gameboard.board[0][0]).toBe(submarine);
  });

  it("should throw error if ship is already placed at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(submarine, 0, 0, true);
    expect(() => gameboard.placeShip(cruiser, 0, 0, true)).toThrow();
  });

  it("should hit the correct ship", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.receiveAttack(0, 0);
    expect(cruiser.getHits()).toBe(1);
  });

  it("should not hit the ship if no ship is placed at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.receiveAttack(5, 5);
    expect(cruiser.getHits()).toBe(0);
  });

  it("should not hit the ship if already hit at specific coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 0);
    expect(cruiser.getHits()).toBe(1);
  });

  it("should record hit at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toBe("hit");
  });

  it("should record miss at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.receiveAttack(5, 5);
    expect(gameboard.board[5][5]).toBe("miss");
  });

  it("should return isSunk() true if ship is sunk", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(cruiser.isSunk()).toBe(true);
  });

  it("should return true if all ships are sunk", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.placeShip(submarine, 1, 0, true);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(1, 2);
    expect(gameboard.checkIfAllShipsSunk()).toBe(true);
  });

  it("should return false if not all ships are sunk", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(cruiser, 0, 0, true);
    gameboard.placeShip(submarine, 1, 0, true);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(1, 1);
    expect(gameboard.checkIfAllShipsSunk()).toBe(false);
  });
});
