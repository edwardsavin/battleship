import createFooter from "./footer";
import setupNewGameBlock from "./setupNewGame-block";

// Populate the main block with all components
function populateMainBlock() {
  const mainBlock = document.querySelector("#main");

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main__container");

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("main__content-wrapper");

  const title = document.createElement("h1");
  title.classList.add("main__container-title");
  title.textContent = "Battleship 44";

  const newGameContainer = setupNewGameBlock();
  contentWrapper.appendChild(newGameContainer);

  const footer = createFooter();

  mainContainer.appendChild(title);
  mainContainer.appendChild(contentWrapper);
  mainBlock?.appendChild(mainContainer);
  mainBlock?.appendChild(footer);
}

export default populateMainBlock;
