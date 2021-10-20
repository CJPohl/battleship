import water from './images/water-tile.png';

const elements = (() => {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');
  document.body.appendChild(mainContainer);

  function initPage() {
    createHeader();
    createBoardContainers();
    createSpacer();
    createFooter();
    fillContainers();
    createIndexes();
    renderGridImages();
  }

  function renderGridImages() {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.src = water;
    });
  }

  function fillContainers() {
    const boards = document.querySelectorAll('.grid-container');
    boards.forEach((board) => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const grid = document.createElement('img');
                grid.classList.add('grid');
                grid.setAttribute('id', `grid-${i}${j}`);
                board.appendChild(grid);
        }
      }
    });
  }

  function createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `
        <h1 class="title">Battleship</h1>
        <button class="new-game">New Game<i class="fa fa-plus"></i></button>
    `;
    document.body.appendChild(header);
  }

  function createSpacer() {
    const spacer = document.createElement('div');
    spacer.classList.add('spacer');
    mainContainer.appendChild(spacer);
  }

  function createBoardContainers() {
    const left = document.createElement('div');
    left.classList.add('game-container');
    const right = document.createElement('div');
    right.classList.add('game-container');

    const playerB = document.createElement('div');
    playerB.classList.add('grid-container');
    const aiB = document.createElement('div');
    aiB.classList.add('grid-container');

    left.appendChild(playerB);
    right.appendChild(aiB);

    mainContainer.appendChild(left);
    mainContainer.appendChild(right);
  }

  function createIndexes() {
    const boards = document.querySelectorAll('.game-container');
    boards.forEach(board => {
        const indexV = document.createElement('div');
        indexV.classList.add('index-v');
        indexV.innerHTML = `
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
        `;
        board.appendChild(indexV);

        const indexH = document.createElement('div');
        indexH.classList.add('index-h');
        indexH.innerHTML = `
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
        `;
        board.appendChild(indexH);
      });
  }

  function createFooter() {
    const footer = document.createElement('div');
    footer.classList.add('footer');
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
