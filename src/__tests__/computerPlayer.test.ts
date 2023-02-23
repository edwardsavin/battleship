import { describe, it, expect } from "vitest";
import createComputerPlayer from "../scripts/computerPlayer";

describe("Computer Player", () => {
  it("should place ships randomly", () => {
    const computer = createComputerPlayer();
    computer.placeShips();
    expect(computer.gameboard.board).not.toBe(null);
  });
});
