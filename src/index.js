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

window.onload = () => {
    elements.initPage();
};
