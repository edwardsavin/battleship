import Player from "./playerFactory";
import createComputerPlayer from "./computerPlayer";

type GameType = {
  player: ReturnType<typeof Player>;
  computer: ReturnType<typeof createComputerPlayer>;
};

// Factory function for creating a game where a player plays against the computer
function Game(playerName: string) {
  // Create a player and a computer player
  const player = Player(playerName);
  const computer = createComputerPlayer();

  // Place the computer's ships
  computer.placeShips();

  // Return an object with the game's state
  return {
    player,
    computer,
  };
}

export type { GameType };
export default Game;
