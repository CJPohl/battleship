// TODO:
// - Create endGame function
// - DOM for end of game
// - Create input for v or h ships
// - Create better UI for ship placement and label size of ship that is next
// - bug fix on ai shots
// - impelement art for ships and shots
// - fix ai render loop to show shots rather than ships
// - MAYBE: fix ai ship positioning
// - Art Assets


import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import 'lodash';

import './style.css';

import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';
import AI from './ai';
import { elements } from './DOM';

const game = (() => {
    const players = [];
    let winner;
  
    window.onload = () => {
    // load intro elements to page
    elements.initPage();
    
    // load event listeners
    const newGameBtn = document.querySelector('.new-game');
    newGameBtn.addEventListener('click', startGame);
  };

  // game initialization
  function startGame() {
    elements.clearMainContainer();
    elements.takeName();

    // listener return name value to game loop
    const begin = document.querySelector('.begin');
    begin.addEventListener('click', () => {
      const name = elements.returnName();
      
      // create player class
      const player = new Player(name);
      players.push(player);

      // prompt ship generation
      elements.clearMainContainer();
      elements.generateBoard(players[0]);
      elements.renderGridImages();
      chooseLocation();
    });
  }

  // game state to get user input for ship location
  function chooseLocation() {
    let locations = [];
    let modes = ['h', 'h', 'h', 'h', 'h'];
    let mode;
    let location;

    const grids = elements.selectPlayerGrids();
    
    grids.forEach(grid => grid.addEventListener('click', (e) => {
        location = elements.createLocationObject(e);
        locations.push(location);

        grid.classList.add('active');

        // if locations array is at 5, clear the board and create ships ----- NEED TO MAKE H/V BUTTON
        if (locations.length === 5) {
        elements.clearMainContainer();
        players[0].generateShips(modes, locations);
        
        // move on to next game state
        createAI();
        }
    }));
  }

  // create AI player class
  function createAI() {
      const player = new AI();
      player.generateShips();
      players.push(player);

      // next game state
      main()
  }

  // using recursion continue the gameloop
  function main() {
    // render boards for both player and ai
    elements.generateBoard(players[0]);
    elements.renderPlayerImages(players[0]);
    elements.renderAIImages(players[1]);

    // player shoot event listener
    const grids = elements.selectAIGrids();
    grids.forEach(grid => grid.addEventListener('click', (e) => {
        const playerCoords = elements.createLocationObject(e);
        const playerShot = players[0].shoot(playerCoords);
        if (playerShot === true) {
            players[1].aiBoard.receiveAttack(playerCoords);
            
            // check if game over
            if (players[1].aiBoard.allSunk === true) {
                winner = players[0].name;
                //endGame(winner);
                console.log('yay game over');
            }
            else {
                elements.clearMainContainer();
                elements.generateBoard(players[0]);
                elements.renderPlayerImages(players[0]);
                elements.renderAIImages(players[1]);

                // AI Time to attack back
                const aiCoords = players[1].shoot();
                players[0].playerBoard.receiveAttack(aiCoords);
            
                // check if game over
                if (players[0].playerBoard.allSunk === true) {
                    winner = 'The Enemy';
                    //endGame(winner);
                    console.log('yay game over');
                }
                else {
                    elements.clearMainContainer();
                    main();
                }
            }
        }
    }));
  }

})();
