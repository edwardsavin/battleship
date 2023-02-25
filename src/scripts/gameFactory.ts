import Player from "./playerFactory";
import createComputerPlayer from "./computerPlayer";

type GameType = {
  player: ReturnType<typeof Player>;
  computer: ReturnType<typeof createComputerPlayer>;
  playerShips: {
    isComputer: boolean;
    name: string;
    coordinates: number[][];
  }[];
  computerShips: {
    isComputer: boolean;
    name: string;
    coordinates: number[][];
  }[];
};

// Get the names and coordinates of the ships
function getShipsNameAndCoordinates(
  player: ReturnType<typeof Player>,
  isComputer = false
) {
  const { ships } = player;

  const shipsNameAndCoordinates = ships.map((ship) => ({
    isComputer,
    name: ship.name,
    coordinates: ship.coordinates,
  }));

  return shipsNameAndCoordinates;
}

// Factory function for creating a game where a player plays against the computer
function Game(playerName: string) {
  // Create a player and a computer player
  const player = Player(playerName);
  const computer = createComputerPlayer();

  // Place the computer's ships
  computer.placeShips();

  // Get the player's ships names and coordinates
  const playerShips = getShipsNameAndCoordinates(player);

  // Get the computer's ships names and coordinates
  const computerShips = getShipsNameAndCoordinates(computer, true);

  // Return an object with the game's state
  return {
    player,
    computer,
    playerShips,
    computerShips,
  };
}

export type { GameType };
export default Game;
