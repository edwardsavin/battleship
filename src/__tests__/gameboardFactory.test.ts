import { describe, it, expect } from "vitest";
import Gameboard from "../scripts/gameboardFactory";
import Ship from "../scripts/shipFactory";

describe("Gameboard", () => {
  it("should place ship at correct coordinates on horizontal", () => {
    const gameboard = Gameboard();
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(submarine, 0, 0, "horizontal");
    expect(gameboard.board[0][0]).toBe(submarine);
  });

  it("should place ship at correct coordinates on vertical", () => {
    const gameboard = Gameboard();
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(submarine, 0, 0, "vertical");
    expect(gameboard.board[0][0]).toBe(submarine);
  });

  it("should throw error if ship is already placed at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    const submarine = Ship(3, "Submarine");
    gameboard.placeShip(submarine, 0, 0, "horizontal");
    expect(() => gameboard.placeShip(cruiser, 0, 0, "horizontal")).toThrow();
  });

  it("should hit the correct ship", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, "horizontal");
    gameboard.receiveAttack(0, 0);
    expect(cruiser.getHits()).toBe(1);
  });

  it("should not hit the ship if no ship is placed at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, "horizontal");
    gameboard.receiveAttack(5, 5);
    expect(cruiser.getHits()).toBe(0);
  });

  it("should not hit the ship if already hit at specific coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, "horizontal");
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 0);
    expect(cruiser.getHits()).toBe(1);
  });

  it("should record hit at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, "horizontal");
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toBe("hit");
  });

  it("should record miss at coordinates", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, "horizontal");
    gameboard.receiveAttack(5, 5);
    expect(gameboard.board[5][5]).toBe("miss");
  });

  it("should return true if ship is sunk", () => {
    const gameboard = Gameboard();
    const cruiser = Ship(3, "Cruiser");
    gameboard.placeShip(cruiser, 0, 0, "horizontal");
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(cruiser.isSunk()).toBe(true);
  });
});
