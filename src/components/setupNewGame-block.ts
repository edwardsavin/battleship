import setupPlayerShips from "./setupPlayerShips-block";

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

  function handleStartGameTrigger() {
    if (inputPlayerName.value === "") {
      alert("Please enter your name");
      return;
    }
    const playerName = inputPlayerName.value;
    setupPlayerShips(playerName);
  }

  inputPlayerName.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleStartGameTrigger();
    }
  });
  buttonStartGame.addEventListener("click", handleStartGameTrigger);

  newGameContainer.appendChild(inputPlayerName);
  newGameContainer.appendChild(buttonStartGame);

  return newGameContainer;
}

export default setupNewGameBlock;
