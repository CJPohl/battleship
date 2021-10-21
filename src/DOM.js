import water from './images/water-tile.png';

const elements = (() => {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');
  document.body.appendChild(mainContainer);

  function initPage() {
    createHeader();
    createIntro();
    createSpacer();
    createFooter();
  }

  function clearMainContainer() {
    mainContainer.innerHTML = '';
    createSpacer();
  }

  // render the intro img when page is loaded
  function createIntro() {
    const introImg = document.createElement('img');
    introImg.src = water;
    introImg.classList.add('intro-img');
    mainContainer.appendChild(introImg);
  }

  // prompts user for user name when new game is selected
  function takeName() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    inputContainer.innerHTML = `
      <input class="name-input" placeholder="Name">
      <button class="begin">Begin</button>
    `;
    mainContainer.appendChild(inputContainer);
  }

  function returnName() {
    const input = document.querySelector('.name-input');
      const name = input.value;
      return name;
  }

  function renderGridImages() {
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
      grid.src = water;
    });
  }

  // place proper src for each grid img
  function renderPlayerImages(player) {
    // creating 1d playerboard array
    const array = player.playerBoard.board;
    const playerBoard = convertArray(array);

    // attach src to each grid based upon conditions
    const grids = selectPlayerGrids();
    for (let i = 0; i < 100; i++) {
      if (playerBoard[i] === null) {
        grids[i].src = water;
      }
    }
  }

  function renderAIImages(player) {
    // creating 1d aiboard array
    const array = player.aiBoard.board;
    const aiBoard = convertArray(array);

    // attach src to each grid based upon conditions
    const grids = selectAIGrids();
    for (let i = 0; i < 100; i++) {
      if (aiBoard[i] === null) {
        grids[i].src = water;
      }
    }
  }

  // function to convert 2d to 1d array for better DOM implementation
  function convertArray(array) {
    const fixedArray = [];
    array.forEach((row) => {
      row.forEach(piece => fixedArray.push(piece));
    });

    return fixedArray;
  }

  function fillContainers() {
    const boards = document.querySelectorAll('.grid-container');
    boards.forEach((board) => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const grid = document.createElement('img');
          grid.classList.add('grid');
          grid.setAttribute('id', `grid-${i}${j}`);
          grid.setAttribute('x', `${i}`);
          grid.setAttribute('y', `${j}`);
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

  function generateBoard(player) {
    createBoardContainers(player);
    fillContainers();
    createIndexes();
  }

  function createBoardContainers(player) {
    const left = document.createElement('div');
    left.classList.add('game-container');
    left.setAttribute('id', 'board-0');
    const right = document.createElement('div');
    right.classList.add('game-container');
    right.setAttribute('id', 'board-1');

    createBoardDescriptions(left, right, player);

    const playerB = document.createElement('div');
    playerB.classList.add('grid-container');
    const aiB = document.createElement('div');
    aiB.classList.add('grid-container');

    left.appendChild(playerB);
    right.appendChild(aiB);

    mainContainer.appendChild(left);
    mainContainer.appendChild(right);
  }

  function createBoardDescriptions(left, right, player) {
    const leftDescription = document.createElement('div');
    leftDescription.classList.add('board-description');
    leftDescription.textContent = `${player.name}'s Fleet`;
    left.appendChild(leftDescription);

    const rightDescription = document.createElement('div');
    rightDescription.classList.add('board-description');
    rightDescription.textContent = 'The Enemy Fleet';
    right.appendChild(rightDescription);
  }

  function createIndexes() {
    const boards = document.querySelectorAll('.game-container');
    boards.forEach((board) => {
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

  // allow access to player grids
  function selectPlayerGrids() {
    const board = document.getElementById('board-0');
    const grids = board.querySelectorAll('.grid');
    return grids;
  }

  // allow access to ai grids
  function selectAIGrids() {
    const board = document.getElementById('board-1');
    const grids = board.querySelectorAll('.grid');
    return grids;
  }

  // create objects to be passed into gameboard create ships method
  function createLocationObject(e) {
    const spliceX = parseInt(e.target.id.substring(5, 6));
    const spliceY = parseInt(e.target.id.substring(6, 7));
    const locationObject = { x: spliceX, y: spliceY };

    return locationObject;
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
    clearMainContainer,
    takeName,
    returnName,
    generateBoard,
    renderGridImages,
    selectPlayerGrids,
    selectAIGrids,
    createLocationObject,
    renderPlayerImages,
    renderAIImages,
  };
})();

export { elements };
