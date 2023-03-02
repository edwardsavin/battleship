import renderBoard from "./renderBoard";
import { GameType } from "../scripts/gameFactory";
import { PlayerType } from "../scripts/playerFactory";
import { ComputerType } from "../scripts/computerPlayer";
// eslint-disable-next-line import/no-cycle
import setupPlayerShips from "./setupPlayerShips-block";

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

// If the game is over, display the winner and ask the player if they want to play again
function showGameOver(
  player: PlayerType,
  enemy: PlayerType,
  mainContentWrapper: Element | null
) {
  const mainContainer = document.querySelector(
    ".main__container"
  ) as HTMLDivElement;
  mainContainer.style.justifyContent = "center";

  const mainContainerTitle = document.querySelector(
    ".main__container-title"
  ) as HTMLHeadingElement;
  mainContainerTitle.style.marginBottom = "0";

  const gameContainer = document.querySelector(
    ".content-wrapper__game-container"
  );
  gameContainer?.remove();

  const gameOverContainer = document.createElement("div");
  gameOverContainer.classList.add("game-over-container");

  const gameOver = document.createElement("h1");
  gameOver.classList.add("game-over");
  gameOver.textContent = `${player.name} wins!`;

  gameOverContainer.appendChild(gameOver);

  // Ask the player if they want to play again
  const playAgain = document.createElement("button");
  playAgain.classList.add("play-again");
  playAgain.textContent = "Play Again";

  gameOverContainer.appendChild(playAgain);

  mainContentWrapper?.appendChild(gameOverContainer);

  playAgain.addEventListener("click", () => {
    gameOver.remove();
    playAgain.remove();

    if ("isComputer" in player) {
      setupPlayerShips(enemy.name);
    } else {
      setupPlayerShips(player.name);
    }
  });
}

function playerAttackDOM(
  x: number,
  y: number,
  player: PlayerType,
  enemy: ComputerType | PlayerType
) {
  // Filter playerName to have lowercase letters, no spaces and no special characters
  const filteredPlayerName = enemy.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const cell = document.querySelector(
    `.board-${filteredPlayerName} [data-x="${x}"][data-y="${y}"]`
  );

  // Add the hit or miss class to the cell
  if (cell) {
    if (enemy.gameboard.board[x][y] === "miss") {
      cell.classList.add("miss");
    } else if (enemy.gameboard.board[x][y] === "hit") {
      cell.classList.add("hit");
    }
  }

  if (enemy.gameboard.checkIfAllShipsSunk()) {
    showGameOver(player, enemy, getMainContentWrapper());
    return;
  }

  // If the enemy is a computer, then it's the computer's turn to attack
  if ("isComputer" in enemy) {
    const computerRandomAttack = enemy.smartAttack(player);
    const [randomX, randomY] = computerRandomAttack;
    playerAttackDOM(randomX, randomY, enemy, player);
  }
}

function createGameBlock(game: GameType) {
  const playerName = game.player.name;
  const computerName = game.computer.name;

  // Filter playerName to have lowercase letters, no spaces and no special characters
  const filteredPlayerName = playerName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const mainContentWrapper = getMainContentWrapper();

  const gameContainer = document.createElement("div");
  gameContainer.classList.add("content-wrapper__game-container");

  const playerWrapper = document.createElement("div");
  playerWrapper.classList.add(`player-wrapper-${filteredPlayerName}`);

  const playerBoardTitle = createBoardTitle(playerName);
  const playerBoard = renderBoard(playerName, game.playerShips);
  playerBoard.classList.remove("board-temp");

  playerWrapper.appendChild(playerBoardTitle);
  playerWrapper.appendChild(playerBoard);

  const computerWrapper = document.createElement("div");
  computerWrapper.classList.add(`player-wrapper-${computerName}`);

  const computerBoardTitle = createBoardTitle(computerName);
  const computerBoard = renderBoard(computerName, game.computerShips);

  computerWrapper.appendChild(computerBoardTitle);
  computerWrapper.appendChild(computerBoard);

  gameContainer.appendChild(playerWrapper);
  gameContainer.appendChild(computerWrapper);

  mainContentWrapper?.appendChild(gameContainer);

  // Add event listeners on all of computerBoard cells
  // The event listeners should call the player's attack function playerAttackDOM(x, y, player, enemy)
  computerBoard.querySelectorAll(".board__cell").forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const x = Number((e.target as HTMLElement).dataset.x);
      const y = Number((e.target as HTMLElement).dataset.y);

      game.player.attack(x, y, game.computer);
      playerAttackDOM(x, y, game.player, game.computer);
    });
  });

  return gameContainer;
}

export default createGameBlock;
