import renderBoard from "./renderBoard";

function removeSetupNewGameBlock() {
  const newGameContainer = document.querySelector(
    ".content-wrapper__new-game-container"
  );
  newGameContainer?.remove();
}

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

function createGameBlock(playerName: string) {
  removeSetupNewGameBlock();

  const mainContentWrapper = getMainContentWrapper();

  const gameContainer = document.createElement("div");
  gameContainer.classList.add("content-wrapper__game-container");

  const playerBoardTitle = createBoardTitle(playerName);
  const playerBoard = renderBoard(playerName);

  const computerBoardTitle = createBoardTitle("Computer");
  const computerBoard = renderBoard("Computer");

  gameContainer.appendChild(playerBoardTitle);
  gameContainer.appendChild(playerBoard);
  gameContainer.appendChild(computerBoardTitle);
  gameContainer.appendChild(computerBoard);

  mainContentWrapper?.appendChild(gameContainer);

  return gameContainer;
}

export default createGameBlock;
