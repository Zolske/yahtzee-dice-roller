import {
  diceRoller,
  buttonDiceRoller,
  changeLock,
  openLocks,
  playTurn,
  createTableRow,
  newPlayer,
  writeScoreTable,
  nextPlayer,
  savePointsTable,
  countTableScore,
  Player,
  updatePlayerScoreObject,
  playerArray,
  playerOrder,
  theWinnerIs,
} from "./function.js";

import { cpuPlayer } from "./cpu.js";
// global variable //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let turnCount = null; // counts how many turns the player has played, max 3, see playTurn()
// let turnScore = []; //the dice score after ever turn
// let playerId;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. adds an click event listener with the function changeLock() to all lock-container children
 */
for (let i = 0; i < 5; i++) {
  let tempImg =
    document.getElementsByClassName("lock-container")[0].children[i];
  tempImg.addEventListener("click", changeLock);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * adds an click event to the button with the id 'create-player', which triggers the buttonDiceRoller() function
 */
document.getElementById("create-player").addEventListener("click", newPlayer);
document
  .getElementById("create-cpu-player")
  .addEventListener("click", function () {
    newPlayer("cpu");
  });
// test button /////////////////////////////////////////////////////////////////////////////////////////////
function test() {
  console.log(playerArray[playerOrder]);
  // theWinnerIs();
}

// document.getElementById("test-cpu-player").addEventListener("click", test);
