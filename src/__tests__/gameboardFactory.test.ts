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
});