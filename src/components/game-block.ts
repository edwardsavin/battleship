import renderBoard from "./renderBoard";
import { GameType } from "../scripts/gameFactory";

function getMainContentWrapper() {
  const mainContentWrapper = document.querySelector(".main__content-wrapper");
  return mainContentWrapper;
}

function createBoardTitle(playerName: string) {
  const boardTitleContainer = document.createElement("div");
  boardTitleContainer.classList.add("player__title-container");

  const boardTitle = document.createElement("h2");
  boardTitle.classList.add("player__title");
  boardTitle.textContent = `${playerName}'s Board`;

  boardTitleContainer.appendChild(boardTitle);

  return boardTitleContainer;
}

function createGameBlock(game: GameType, tempBoard: HTMLDivElement) {
  const playerName = game.player.name;
  const computerName = game.computer.name;

  const mainContentWrapper = getMainContentWrapper();

  const gameContainer = document.createElement("div");
  gameContainer.classList.add("content-wrapper__game-container");

  const playerBoardTitle = createBoardTitle(playerName);
  const playerBoard = renderBoard(playerName, game.playerShips);
  playerBoard.classList.remove("board-temp");

  const computerBoardTitle = createBoardTitle(computerName);
  const computerBoard = renderBoard(computerName, game.computerShips);

  gameContainer.appendChild(playerBoardTitle);
  gameContainer.appendChild(playerBoard);
  gameContainer.appendChild(computerBoardTitle);
  gameContainer.appendChild(computerBoard);

  mainContentWrapper?.appendChild(gameContainer);

  return gameContainer;
}

export default createGameBlock;
