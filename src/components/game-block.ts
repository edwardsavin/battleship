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

function playerAttackDOM(x: number, y: number, player: any, enemy: any) {
  const cell = document.querySelector(
    `.board-${enemy.name} [data-x="${x}"][data-y="${y}"]`
  );

  // Add the hit or miss class to the cell
  if (cell) {
    if (enemy.gameboard.board[x][y] === "miss") {
      cell.classList.add("miss");
    } else if (enemy.gameboard.board[x][y] === "hit") {
      cell.classList.add("hit");
    }
  }

  // Check if the game is over
  if (enemy.gameboard.checkIfAllShipsSunk()) {
    const mainContentWrapper = getMainContentWrapper();
    const gameContainer = document.querySelector(
      ".content-wrapper__game-container"
    );
    gameContainer?.remove();

    const gameOver = document.createElement("h1");
    gameOver.classList.add("game-over");
    gameOver.textContent = `${player.name} wins!`;

    mainContentWrapper?.appendChild(gameOver);

    return;
  }

  // If the enemy is a computer, then it's the computer's turn to attack
  if (enemy.isComputer) {
    const computerRandomAttack = enemy.randomAttack(player);
    const [randomX, randomY] = computerRandomAttack;
    playerAttackDOM(randomX, randomY, enemy, player);
  }
}

function createGameBlock(game: GameType) {
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
