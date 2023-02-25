import { describe, it, expect } from "vitest";
import Ship from "../scripts/shipFactory";

describe("Ship", () => {
  it("should return a ship object", () => {
    const ship = Ship(3, "Submarine");
    expect(ship).toEqual({
      length: 3,
      name: "Submarine",
      isSunk: expect.any(Function),
      hit: expect.any(Function),
      getHits: expect.any(Function),
      changeCoordinates: expect.any(Function),
      coordinates: [],
    });
  });

  it("should return the correct length", () => {
    const ship = Ship(3, "Submarine");
    expect(ship.length).toBe(3);
  });

  it("should increase hits when hit", () => {
    const ship = Ship(3, "Submarine");
    ship.hit();
    expect(ship.getHits()).toBe(1);
  });

  it("should throw an error when hit after sunk", () => {
    const ship = Ship(3, "Submarine");
    ship.hit();
    ship.hit();
    ship.hit();
    expect(() => ship.hit()).toThrowError("Ship is sunk");
  });

  it("should return true when sunk", () => {
    const ship = Ship(3, "Submarine");
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
