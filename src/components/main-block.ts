import setupNewGameBlock from "./setupNewGame-block";

// Populate the main block with all components
function populateMainBlock() {
  const mainBlock = document.querySelector("#main");

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main__container");

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("main__content-wrapper");

  const newGameContainer = setupNewGameBlock();
  contentWrapper.appendChild(newGameContainer);

  mainContainer.appendChild(contentWrapper);
  mainBlock?.appendChild(mainContainer);
}

export default populateMainBlock;
