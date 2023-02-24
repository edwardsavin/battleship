import createGameBlock from "./game-block";
import renderBoard from "./renderBoard";
import Game from "../scripts/gameFactory";

function removeSetupNewGameBlock() {
  const newGameContainer = document.querySelector(
    ".content-wrapper__new-game-container"
  );
  newGameContainer?.remove();
}

function setupPlayerShips(playerName: string) {
  removeSetupNewGameBlock();

  const mainContentWrapper = document.querySelector(".main__content-wrapper");
  const tempBoardContainer = document.createElement("div");
  tempBoardContainer.classList.add("content-wrapper__temp-board-container");

  const tempBoardTitle = document.createElement("h2");
  tempBoardTitle.classList.add("temp-board__title");

  const rotateButton = document.createElement("button");
  rotateButton.classList.add("temp-board__rotate-button");
  rotateButton.textContent = "Rotate";

  const tempBoard = renderBoard(playerName);
  tempBoard.classList.add("board-temp");

  tempBoardContainer.appendChild(tempBoardTitle);
  tempBoardContainer.appendChild(rotateButton);
  tempBoardContainer.appendChild(tempBoard);
  mainContentWrapper?.appendChild(tempBoardContainer);

  const game = Game(playerName);

  let shipToPlace = game.player.ships[0];
  tempBoardTitle.textContent = `Place your ${shipToPlace.name}`;

  let isHorizontal = true;
  rotateButton.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
  });

  // Add event listener to each cell in the temporary board
  tempBoard.addEventListener("click", (e) => {
    const target = e.target as HTMLDivElement;
    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);

    // Check if the cell is already occupied
    try {
      game.player.placeShip(shipToPlace, x, y, isHorizontal);
    } catch (error) {
      alert(error);
      return;
    }

    // Add the ship class to the cell
    target.classList.add("board__cell--ship");
    if (isHorizontal) {
      for (let i = 1; i < shipToPlace.length; i += 1) {
        const cell = document.querySelector(
          `.board-temp[data-x="${x + i}"][data-y="${y}"]`
        );
        cell?.classList.add("board__cell--ship");
      }
    } else {
      for (let i = 1; i < shipToPlace.length; i += 1) {
        const cell = document.querySelector(
          `.board-temp[data-x="${x}"][data-y="${y + i}"]`
        );
        cell?.classList.add("board__cell--ship");
      }
    }

    // Check if there are any more ships to place
    const nextShipIndex = game.player.ships.indexOf(shipToPlace) + 1;
    if (nextShipIndex < game.player.ships.length) {
      shipToPlace = game.player.ships[nextShipIndex];
      tempBoardTitle.textContent = `Place your ${shipToPlace.name}`;
    } else {
      tempBoardContainer.remove();
      createGameBlock(game);
    }
  });

  return tempBoardContainer;
}

export default setupPlayerShips;
