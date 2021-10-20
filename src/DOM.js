const elements = (() => {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');
    document.body.appendChild(mainContainer);
    
    function initPage() {
    _createHeader();
    _createBoardContainers();
    _createSpacer();
    _createFooter();
    fillContainers();
  }

  function fillContainers() {
      const playerB = document.querySelector('.player-b');
      const aiB = document.querySelector('.ai-b');

      const boards = [];
      boards.push(playerB, aiB);
      boards.forEach(board => {
          for (let i = 0; i < 10; i++) {
              for (let j = 0; j < 10; j++) {
                  const grid = document.createElement('div');
                  grid.classList.add('grid');
                  board.appendChild(grid);
              }
          }
      })
  }

  function _createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `
        <h1 class="title">Battleship</h1>
        <button class="new-game">New Game<i class="fa fa-plus"></i></button>
    `;
    document.body.appendChild(header);
  }

  function _createSpacer() {
      const spacer = document.createElement('div');
      spacer.classList.add('spacer');
      mainContainer.appendChild(spacer);
  }

  function _createBoardContainers() {
      const playerB = document.createElement('div');
      playerB.classList.add('player-b');
      const aiB = document.createElement('div');
      aiB.classList.add('ai-b');

      mainContainer.appendChild(playerB);
      mainContainer.appendChild(aiB);
  }

  function _createFooter() {
    const footer = document.createElement('div');
    footer.classList.add("footer");
    footer.innerHTML = `
            <p>Copyright @ 2021 Christopher J. Pohl</p><a href="https://github.com/CJPohl"><i class="fab fa-github"></i></a>
        `;
    document.body.appendChild(footer);
  }
    
  return {
    initPage,
  };
})();

export { elements };
