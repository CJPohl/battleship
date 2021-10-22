import sampleBoard from './images/sample-board.PNG';
import waterTile from './images/water-tile.png';
import waterTileMiss from './images/water-tile-miss.png';
import waterTitleHit from './images/water-tile-hit.png';
import shipCenterBlank from './images/ship-center-blank.png';
import shipCenterHit from './images/ship-center-hit.png';
import shipLeft from './images/ship-left.png';
import shipTop from './images/ship-top.png';
import shipRight from './images/ship-right.png';
import shipBottom from './images/ship-bottom.png';

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
    introImg.src = sampleBoard;
    introImg.classList.add('intro-img');

    const introContainer = document.createElement('div');
    introContainer.classList.add('intro-container');
    introContainer.innerHTML = `
      <div class="img-title-container">
        <h1 class="img-title">BATTLESHIP</h1>
        <p class="img-subtitle">Press <button class="new-game">New Game  <i class="fa fa-plus"></i></button> to Begin</p>
      </div>
    `;
    introContainer.appendChild(introImg);
    
    mainContainer.appendChild(introContainer);
  }

  // prompts user for user name when new game is selected
  function takeName() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    inputContainer.innerHTML = `
      <input type="text" class="name-input" placeholder="Name">
      <button class="begin">Begin</button>
    `;
    mainContainer.appendChild(inputContainer);
  }

  function returnName() {
    const input = document.querySelector('.name-input');
      const name = input.value;
      return name;
  }

  // adding the vh switch that allows players to choose v or h for placement
  function addVHSwitch() {
    const vhContainer = document.createElement('div');
    vhContainer.classList.add('vh-container');
    vhContainer.innerHTML = `
      <label for="h">H</label>
      <input type="radio" id="h" name="hv" value="h" checked>
      <label for"v">V</label>
      <input type="radio" id="v" name="hv" value="v">
      <div class="sizes">Sizes:
        <p class="size">2</p>
        <p class="size">3</p>
        <p class="size">3</p>
        <p class="size">4</p>
        <p class="size">5</p>
      </div>
    `;

    mainContainer.appendChild(vhContainer);
  }

  function renderGridImages() {
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
      grid.src = waterTile;
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
      if (playerBoard[i] === 'ht') {
        grids[i].src = shipLeft;
      }
      else if (playerBoard[i] === 'vt') {
        grids[i].src = shipTop;
      }
      else if (playerBoard[i] === 'hb') {
        grids[i].src = shipRight;
      }
      else if (playerBoard[i] === 'vb') {
        grids[i].src = shipBottom;
      }
      else if (playerBoard[i] === '') {
        grids[i].src = waterTileMiss;
      }
      else if (playerBoard[i] === '-') {
        grids[i].src = shipCenterBlank;
      }
      else if (playerBoard[i] === 'X') {
        grids[i].src = shipCenterHit;
      }
      else {
        grids[i].src = waterTile;
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
      if (aiBoard[i] === '') {
        grids[i].src = waterTileMiss;
      }
      else if (aiBoard[i] === 'X') {
        grids[i].src = waterTitleHit;
      }
      else {
        grids[i].src = waterTile;
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
        <button class="refresh">Refresh Page<i class="fas fa-redo"></i></button>
    `;
    document.body.appendChild(header);
  }

  function reloadPage() {
    window.location.reload();
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

  function renderGameOver(winner) {
    const introImg = document.createElement('img');
    introImg.src = sampleBoard;
    introImg.classList.add('intro-img');

    const winnerContainer = document.createElement('div');
    winnerContainer.classList.add('winner-container');
    winnerContainer.innerHTML = `
      <div class="img-title-container">
        <h1 class="img-title">${winner} Wins!</h1>
        <p class="img-subtitle">Press "Refresh Page" to Play Again</p>
      </div>
    `;
    winnerContainer.appendChild(introImg);

    mainContainer.appendChild(winnerContainer);
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
    reloadPage,
    takeName,
    returnName,
    generateBoard,
    addVHSwitch,
    renderGridImages,
    selectPlayerGrids,
    selectAIGrids,
    createLocationObject,
    renderPlayerImages,
    renderAIImages,
    renderGameOver,
  };
})();

export { elements };
