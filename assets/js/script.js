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

// >>> start modal code ////////////////////////////////////////////////////////////////
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// <<< end modal code ////////////////////////////////////////////////////////////////
