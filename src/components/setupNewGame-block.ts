import createGameBlock from "./game-block";

function setupNewGameBlock() {
  const newGameContainer = document.createElement("div");
  newGameContainer.classList.add("content-wrapper__new-game-container");

  const inputPlayerName = document.createElement("input");
  inputPlayerName.classList.add("new-game__input-player-name");
  inputPlayerName.setAttribute("type", "text");
  inputPlayerName.setAttribute("placeholder", "Enter your name");
  inputPlayerName.setAttribute("maxlength", "12");

  const buttonStartGame = document.createElement("button");
  buttonStartGame.classList.add("new-game__button-start-game");
  buttonStartGame.textContent = "Start";

  buttonStartGame.addEventListener("click", () => {
    if (inputPlayerName.value === "") {
      alert("Please enter your name");
      return;
    }
    const playerName = inputPlayerName.value;

    createGameBlock(playerName);
  });

  newGameContainer.appendChild(inputPlayerName);
  newGameContainer.appendChild(buttonStartGame);

  return newGameContainer;
}

export default setupNewGameBlock;
