function newGameBlock() {
  const newGameContainer = document.createElement("div");
  newGameContainer.classList.add("main__new-game-container");

  const inputPlayerName = document.createElement("input");
  inputPlayerName.classList.add("main__input-player-name");
  inputPlayerName.setAttribute("type", "text");
  inputPlayerName.setAttribute("placeholder", "Enter your name");
  inputPlayerName.setAttribute("maxlength", "12");

  const buttonPlayerName = document.createElement("button");
  buttonPlayerName.classList.add("main__button-start-game");
  buttonPlayerName.textContent = "Start";

  newGameContainer.appendChild(inputPlayerName);
  newGameContainer.appendChild(buttonPlayerName);

  return newGameContainer;
}

export default newGameBlock;
