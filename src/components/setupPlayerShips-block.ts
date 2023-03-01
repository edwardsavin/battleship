// eslint-disable-next-line import/no-cycle
import createGameBlock from "./game-block";
import renderBoard from "./renderBoard";
import Game from "../scripts/gameFactory";
import { ShipType } from "../scripts/shipFactory";

function removeSetupNewGameBlock() {
  const newGameContainer = document.querySelector(
    ".content-wrapper__new-game-container"
  );
  newGameContainer?.remove();
}

function isOutOfBounds(
  x: number,
  y: number,
  length: number,
  isHorizontal: boolean
): boolean {
  return isHorizontal ? y + length > 10 : x + length > 10;
}

function isCellOccupied(target: HTMLDivElement): boolean {
  return target.classList.contains("ship");
}

function isPlacementValid(target: HTMLDivElement): boolean {
  return target.dataset.validPlacement === "true";
}

function getTargetCell(
  x: number,
  y: number,
  i: number,
  isHorizontal: boolean,
  board: HTMLDivElement
): HTMLDivElement | null {
  return isHorizontal
    ? (board.querySelector(
        `[data-x="${x}"][data-y="${y + i}"]`
      ) as HTMLDivElement)
    : (board.querySelector(
        `[data-x="${x + i}"][data-y="${y}"]`
      ) as HTMLDivElement);
}

// If the placement is valid, add a data attribute named "hover-ship" to the target cells with the ship's name
function addHoverShipDataAttribute(
  x: number,
  y: number,
  isHorizontal: boolean,
  tempBoard: HTMLDivElement,
  shipToPlace: ShipType
) {
  for (let i = 0; i < shipToPlace.length; i += 1) {
    const targetCell = getTargetCell(x, y, i, isHorizontal, tempBoard);
    if (targetCell) {
      targetCell.dataset.hoverShip = shipToPlace.name;
    }
  }
}

// Delete the "hover-ship" data attribute from the target cells when the mouse leaves the cell
function deleteHoverShipDataAttribute(
  x: number,
  y: number,
  isHorizontal: boolean,
  tempBoard: HTMLDivElement,
  shipToPlace: ShipType,
  updatedTarget: HTMLDivElement
) {
  updatedTarget.addEventListener("mouseleave", () => {
    for (let i = 0; i < shipToPlace.length; i += 1) {
      const targetCell = getTargetCell(x, y, i, isHorizontal, tempBoard);
      if (targetCell) {
        delete targetCell.dataset.hoverShip;
      }
    }
  });
}

function validateShipPlacement(
  tempBoard: HTMLDivElement,
  shipToPlace: ShipType,
  isHorizontal: boolean,
  target: HTMLDivElement,
  x: number,
  y: number
) {
  const updatedTarget = target;

  // Check if the placement is out of bounds
  if (isOutOfBounds(x, y, shipToPlace.length, isHorizontal)) {
    updatedTarget.dataset.validPlacement = "false";
    return;
  }

  // Check if any of the adjacent cells are occupied
  for (let i = 0; i < shipToPlace.length; i += 1) {
    const adjacentCell = getTargetCell(x, y, i, isHorizontal, tempBoard);

    // If the adjacent cell is occupied, the placement is invalid
    if (adjacentCell && isCellOccupied(adjacentCell)) {
      updatedTarget.dataset.validPlacement = "false";
      return;
    }
  }

  addHoverShipDataAttribute(x, y, isHorizontal, tempBoard, shipToPlace);
  deleteHoverShipDataAttribute(
    x,
    y,
    isHorizontal,
    tempBoard,
    shipToPlace,
    updatedTarget
  );

  updatedTarget.dataset.validPlacement = "true";
}

// Allow player to place their ships on the board
function setupPlayerShips(playerName: string) {
  removeSetupNewGameBlock();

  const mainContainer = document.querySelector(
    ".main__container"
  ) as HTMLDivElement;
  mainContainer.style.justifyContent = "flex-start";

  const mainContentWrapper = document.querySelector(".main__content-wrapper");
  const tempBoardContainer = document.createElement("div");
  tempBoardContainer.classList.add("content-wrapper__temp-board-container");

  const tempBoardTitle = document.createElement("h2");
  tempBoardTitle.classList.add("temp-board__title");

  let isHorizontal = true;
  const rotateButton = document.createElement("button");
  rotateButton.classList.add("temp-board__rotate-button");

  rotateButton.textContent = "Vertical 🔁";
  if (isHorizontal) {
    rotateButton.textContent = "Horizontal 🔁";
  } else {
    rotateButton.textContent = "Vertical 🔁";
  }

  const tempBoard = renderBoard(playerName);
  tempBoard.classList.add("board-temp");

  tempBoardContainer.appendChild(tempBoardTitle);
  tempBoardContainer.appendChild(rotateButton);
  tempBoardContainer.appendChild(tempBoard);
  mainContentWrapper?.appendChild(tempBoardContainer);

  const game = Game(playerName);

  let shipToPlace = game.player.ships[0];
  tempBoardTitle.textContent = `Place your ${shipToPlace.name}`;

  rotateButton.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
    if (isHorizontal) {
      rotateButton.textContent = "Horizontal 🔁";
    } else {
      rotateButton.textContent = "Vertical 🔁";
    }
  });

  function handleMouseOver(e: MouseEvent | TouchEvent) {
    const target = e.target as HTMLDivElement;
    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);

    validateShipPlacement(tempBoard, shipToPlace, isHorizontal, target, x, y);
  }

  function handleMouseOut(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    delete target.dataset.validPlacement;
  }

  // Add event listener to each cell in the temporary board
  function handleMouseClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);

    const errorParagraph = document.createElement("p");
    errorParagraph.classList.add("temp-board__error");
    errorParagraph.setAttribute("role", "alert");

    // Remove the error paragraph if it already exists
    const existingErrorParagraph = document.querySelector(
      ".temp-board__error"
    ) as HTMLParagraphElement;
    if (existingErrorParagraph) {
      existingErrorParagraph.remove();
    }

    if (isOutOfBounds(x, y, shipToPlace.length, isHorizontal)) {
      errorParagraph.textContent = "Ship is out of bounds.";
      tempBoardContainer.insertBefore(errorParagraph, tempBoard);

      delete target.dataset.validPlacement;
      return;
    }

    if (isCellOccupied(target)) {
      errorParagraph.textContent = "This cell is already occupied by a ship.";
      tempBoardContainer.insertBefore(errorParagraph, tempBoard);

      delete target.dataset.validPlacement;
      return;
    }

    if (!isPlacementValid(target)) {
      errorParagraph.textContent = "Cannot place ship on top of another ship.";
      tempBoardContainer.insertBefore(errorParagraph, tempBoard);

      delete target.dataset.validPlacement;
      return;
    }

    // Add the ship to the game board
    try {
      game.player.placeShip(shipToPlace, x, y, isHorizontal);
    } catch (error) {
      if (error instanceof Error) {
        errorParagraph.textContent = error.message;
      }
      return;
    }

    // Add the ship class to the cell
    target.classList.add("ship");

    // Add data attributes to the cell with the part of the ship
    target.dataset.ship = shipToPlace.name;
    target.dataset.shipPart = "0";

    // Add the ship class and data attributes to the adjacent cells
    for (let i = 1; i < shipToPlace.length; i += 1) {
      const adjacentCell = tempBoard.querySelector(
        `[data-x="${isHorizontal ? x : x + i}"][data-y="${
          isHorizontal ? y + i : y
        }"]`
      ) as HTMLDivElement;

      adjacentCell.classList.add("ship");
      adjacentCell.dataset.ship = shipToPlace.name;
      adjacentCell.dataset.shipPart = `${i}`;
    }

    // Check if there are any more ships to place and place the next ship
    // If there aren't, remove the temporary board and create the game board
    const nextShipIndex = game.player.ships.indexOf(shipToPlace) + 1;
    if (nextShipIndex < game.player.ships.length) {
      shipToPlace = game.player.ships[nextShipIndex];
      tempBoardTitle.textContent = `Place your ${shipToPlace.name}`;
    } else {
      tempBoardContainer.remove();
      tempBoard.removeEventListener("mouseover", handleMouseOver);
      tempBoard.removeEventListener("touchstart", handleMouseOver);
      tempBoard.removeEventListener("mouseout", handleMouseOut);
      tempBoard.removeEventListener("click", handleMouseClick);

      createGameBlock(game);
    }
  }

  tempBoard.addEventListener("mouseover", handleMouseOver);
  tempBoard.addEventListener("touchstart", handleMouseOver);
  tempBoard.addEventListener("mouseout", handleMouseOut);
  tempBoard.addEventListener("click", handleMouseClick);

  return tempBoardContainer;
}

export default setupPlayerShips;
