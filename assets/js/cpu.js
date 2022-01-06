import {
  playerArray,
  playerOrder,
  countTableScore,
  openLocks,
  nextPlayer,
  diceRoller,
  buttonDiceRoller,
} from "./function.js";

let consoleDecisionTree = true; // console.logs cpuDecisionThree dice matches
let originalTurnScore = [];
let turnCount = 0;
let turnScore = [];
// let playerArray = [];
// to count dice score together
const addTogether = (previousValue, currentValue) =>
  previousValue + currentValue;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * CPU player
 */
export function cpuPlayer() {
  let playerId = playerArray[playerOrder].playerId;
  turnScore = playerArray[playerOrder].updateDiceScore();
  document
    .getElementById("button-" + playerId)
    .setAttribute("src", "assets/images/robot-pointing.gif");
  // document
  //   .getElementById("button-" + playerId)
  //   .classList.toggle("player-flash");

  cpuDecisionThree();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////
// CPU decision three //
////////////////////////
function cpuDecisionThree() {
  // increases turn-count
  ++playerArray[playerOrder].turn;
  // display turn-count
  document.getElementById("showTurn").textContent =
    "turn " + playerArray[playerOrder].turn + " of 3";

  buttonDiceRoller();
  turnScore = playerArray[playerOrder].updateDiceScore();
  openLocks();

  /////////////////////////////////////////////////////////////////
  // >>> start for testing
  let testScore = [1, 1, 1, 1, 1];
  turnScore = testScore;
  // playerArray[playerOrder].diceScore = testScore;
  console.log(
    "total turn : " +
      playerArray[playerOrder].totalTurn +
      "|, cpu turn score is : " +
      turnScore
  );
  // <<< end for testing
  // >>> start test, playerArray write score
  // playerArray[playerOrder].aces = 3;
  // playerArray[playerOrder].twos = 6;
  // playerArray[playerOrder].threes = 9;
  // playerArray[playerOrder].fours = 12;
  // playerArray[playerOrder].fives = 15;
  // playerArray[playerOrder].sixes = 18;
  // playerArray[playerOrder].threeOfKind = 20;
  // playerArray[playerOrder].fourOfKind = 22;
  // playerArray[playerOrder].fullHouse = 25;
  // playerArray[playerOrder].smallStraight = 30;
  // playerArray[playerOrder].largeStraight = 40;
  // playerArray[playerOrder].yahtzee = 50;
  // playerArray[playerOrder].chance = 26;
  // playerArray[playerOrder].updateScore();
  // console.log(playerArray[playerOrder]);
  // <<< end test, playerArray write score
  /////////////////////////////////////////////////////////////////

  if (isAxFactor(5)) {
    if (consoleDecisionTree) {
      console.log("isAxFactor(5)");
    }
    // Ax5
    switch (true) {
      case canWrite("yahtzee"):
        cpuText(
          "Looks like I have 😁...",
          "Cool, 😎 it is a 🤩'yahtzee'!"
        ).then(() => {
          writeScoreEndTurn("yahtzee");
        });
        break;
      case canWrite("sixes") && isNumTimes(6, 5):
        cpuText("Looks like ...", "Bingo, 😜 it is 'sixes'!").then(() => {
          writeScoreEndTurn("sixes");
        });
        break;
      case canWrite("fives") && isNumTimes(5, 5):
        cpuText("Looks like ...", "Cool, 🤠 it is a 'fives'!").then(() => {
          writeScoreEndTurn("fives");
        });
        break;
      case canWrite("fours") && isNumTimes(4, 5):
        cpuText("Looks like ...", "🧐 it is 'fours'!").then(() => {
          writeScoreEndTurn("fours");
        });
        break;
      case canWrite("fourOfKind") && isFourOfKind():
        cpuText("Looks like ...", "🤪 it is 'fourOfKind'!").then(() => {
          writeScoreEndTurn("fourOfKind");
        });
        break;
      case canWrite("threeOfKind") && isThreeOfKind():
        cpuText("Looks like ...", "👽 it is 'threeOfKind'!").then(() => {
          writeScoreEndTurn("threeOfKind");
        });
        break;
      case canWrite("threes") && isNumTimes(3, 5):
        cpuText("Looks like ...", "🤓 it is 'threes'!").then(() => {
          writeScoreEndTurn("threes");
        });
        break;
      case canWrite("twos") && isNumTimes(2, 5):
        cpuText("Looks like ...", "🙂 it is 'twos'!").then(() => {
          writeScoreEndTurn("twos");
        });
        break;
      case canWrite("aces") && isNumTimes(1, 5):
        cpuText("Looks like ...", "😲 it is 'aces'!").then(() => {
          writeScoreEndTurn("aces");
        });
        break;
    }
  } else if (isAxFactor(4)) {
    if (consoleDecisionTree) {
      console.log("isAxFactor(4)");
    }
    // Ax4
    switch (true) {
      case canWrite("yahtzee") && playerArray[playerOrder].turn < 3:
        cpuText(
          "What can I do?",
          "I have an idea 💡, I roll only one dice!"
        ).then(() => {
          lockXofKind(4);
        });
        break;
      case canWrite("fourOfKind"):
        cpuText(
          "Looks like I have ...",
          "Yes, 😄 it is a 'four of kind'!"
        ).then(() => {
          writeScoreEndTurn("fourOfKind");
        });
        break;
      case canWrite("threeOfKind"):
        cpuText("Huuuh I think 🤔, ...", "It is a 'three of kind'!").then(
          () => {
            writeScoreEndTurn("threeOfKind");
          }
        );
        break;
      case canWrite("sixes") && isNumTimes(6, 4):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'sixes'!").then(() => {
          writeScoreEndTurn("sixes");
        });
        break;
      case canWrite("fives") && isNumTimes(5, 4):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'fives'!").then(() => {
          writeScoreEndTurn("fives");
        });
        break;
      case canWrite("fours") && isNumTimes(4, 4):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'fours'!").then(() => {
          writeScoreEndTurn("fours");
        });
        break;
      case canWrite("threes") && isNumTimes(3, 4):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'threes'!").then(() => {
          writeScoreEndTurn("threes");
        });
        break;
      case canWrite("twos") && isNumTimes(2, 4):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'twos'!").then(() => {
          writeScoreEndTurn("twos");
        });
        break;
      case canWrite("aces") && isNumTimes(1, 4):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'aces'!").then(() => {
          writeScoreEndTurn("aces");
        });
        break;
      case canWrite("fullHouse") && playerArray[playerOrder].turn < 3:
        cpuText(
          "What to do?? 🤯",
          "I roll two dices, may be I get a 'full house' 😇"
        ).then(() => {
          lockXofKind(3);
        });
        break;
    }
  } else if (isFullHouse()) {
    if (consoleDecisionTree) {
      console.log("isFullHouse()");
    }
    // full house
    switch (true) {
      case canWrite("fullHouse"):
        cpuText("Yeah, 😆", "🤖 it is a 'full house'!").then(() => {
          writeScoreEndTurn("fullHouse");
        });
        break;
    }
  } else if (isAxFactor(3)) {
    if (consoleDecisionTree) {
      console.log("isAxFactor(3)");
    }
    // Ax3
    switch (true) {
      case canWrite("yahtzee") && playerArray[playerOrder].turn < 3:
        cpuText(
          "That is not easy 🤯 ...",
          "But I know what I can do 😵. I roll only two dice!"
        ).then(() => {
          lockXofKind(3);
        });
        break;
      case canWrite("threeOfKind"):
        cpuText("Huuuh I think 🤔, ...", "It is a 'three of kind'!").then(
          () => {
            writeScoreEndTurn("threeOfKind");
          }
        );
        break;
      case canWrite("sixes") && isNumTimes(6, 3):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'sixes'!").then(() => {
          writeScoreEndTurn("sixes");
        });
        break;
      case canWrite("fives") && isNumTimes(5, 3):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'fives'!").then(() => {
          writeScoreEndTurn("fives");
        });
        break;
      case canWrite("fours") && isNumTimes(4, 3):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'fours'!").then(() => {
          writeScoreEndTurn("fours");
        });
        break;
      case canWrite("threes") && isNumTimes(3, 3):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'threes'!").then(() => {
          writeScoreEndTurn("threes");
        });
        break;
      case canWrite("twos") && isNumTimes(2, 3):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'twos'!").then(() => {
          writeScoreEndTurn("twos");
        });
        break;
      case canWrite("aces") && isNumTimes(1, 3):
        cpuText("Mhhh 🙃, ...", "Ok, I write in 'aces'!").then(() => {
          writeScoreEndTurn("aces");
        });
        break;
    }
  } else if (isLargeStraight()) {
    if (consoleDecisionTree) {
      console.log("isLargeStraight()");
    }
    // ABCDE or large straight
    switch (true) {
      case canWrite("largeStraight"):
        cpuText(
          "Yeap 😊, ...",
          "That is what I call a 'large straight'! 🤩"
        ).then(() => {
          writeScoreEndTurn("largeStraight");
        });
        break;
      case canWrite("smallStraight"):
        cpuText("Oh 🤗, ...", "'Small straight' 😝!").then(() => {
          writeScoreEndTurn("smallStraight");
        });
        break;
    }
  } else if (isSmallStraight()) {
    if (consoleDecisionTree) {
      console.log("isSmallStraight()");
    }
    // ABCD or small straight
    switch (true) {
      case canWrite("largeStraight") && playerArray[playerOrder].turn < 3:
        cpuText(
          "Mhhh, ...",
          "😏 Let's try to make a 'large straight'! 😉"
        ).then(() => {
          lockABCD();
        });
        break;
      case canWrite("smallStraight"):
        cpuText("Mhhh, ...", "🤪 Ok it is a 'small straight'! 😄").then(() => {
          writeScoreEndTurn("smallStraight");
        });
        break;
    }
  } else if (isABC()) {
    if (consoleDecisionTree) {
      console.log("isABC()");
    }
    //ABC
    switch (true) {
      case canWrite("largeStraight") && playerArray[playerOrder].turn < 3:
        cpuText(
          "Ohhho, 😲",
          "🤓 If I lock three dices and roll two? May be I can make a 'straight'🤨! 😉"
        ).then(() => {
          lockABC();
        });
        break;
      case canWrite("smallStraight") && playerArray[playerOrder].turn < 3:
        cpuText(
          "Ohhho, 😲",
          "🤓 If I lock three dices and roll two? May be I can make a 'small straight'🤨! 😉"
        ).then(() => {
          lockABC();
        });
        break;
    }
  }
}
// if (playerArray[playerOrder].turn == 3) {
//   // document
//   //   .getElementById("button-" + playerId)
//   //   .classList.remove("player-flash");
//   crossOff();
// }

// document.getElementById("button-" + playerId).classList.add("player-flash");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. writes points into the table
 * 2. disables button in which points are written
 * 3. => calls the endCpuTurnNext(), which ends turn and starts next player
 * @param {string} type point category (e.g. yahtzee)
 */
function writeScoreEndTurn(type) {
  let playerId = playerArray[playerOrder].playerId;
  let tableId = document.getElementById(type + playerId);
  switch (type) {
    case "chance":
      tableId.textContent = turnScore.reduce(addTogether);
      playerArray[playerOrder].chance = turnScore.reduce(addTogether);
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "yahtzee":
      tableId.textContent = 50;
      playerArray[playerOrder].yahtzee = 50;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "largeStraight":
      tableId.textContent = 40;
      playerArray[playerOrder].largeStraight = 40;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "smallStraight":
      tableId.textContent = 30;
      playerArray[playerOrder].smallStraight = 30;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fullHouse":
      tableId.textContent = 25;
      playerArray[playerOrder].fullHouse = 25;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "sixes":
      tableId.textContent = diceArrayCount()[5].length * 6;
      playerArray[playerOrder].sixes = diceArrayCount()[5].length * 6;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fives":
      tableId.textContent = diceArrayCount()[4].length * 5;
      playerArray[playerOrder].fives = diceArrayCount()[4].length * 5;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fours":
      tableId.textContent = diceArrayCount()[3].length * 4;
      playerArray[playerOrder].fours = diceArrayCount()[3].length * 4;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fourOfKind":
      tableId.textContent = turnScore.reduce(addTogether);
      playerArray[playerOrder].fourOfKind = turnScore.reduce(addTogether);
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "threeOfKind":
      tableId.textContent = turnScore.reduce(addTogether);
      playerArray[playerOrder].threeOfKind = turnScore.reduce(addTogether);
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "threes":
      tableId.textContent = diceArrayCount()[2].length * 3;
      playerArray[playerOrder].threes = diceArrayCount()[2].length * 3;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "twos":
      tableId.textContent = diceArrayCount()[1].length * 2;
      playerArray[playerOrder].twos = diceArrayCount()[1].length * 2;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "aces":
      tableId.textContent = diceArrayCount()[0].length * 1;
      playerArray[playerOrder].aces = diceArrayCount()[0].length * 1;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. disables current player button
 * 2. updates the total score in the table
 * 3. opens lock icons on dice
 * 4. changes playerId to the next player in the playerArray
 * 5. enables the button for the next player
 * 6. resets the turnCounter to 0
 */
function endCpuTurnNext() {
  let playerId = playerArray[playerOrder].playerId;
  document.getElementById("button-" + playerId).setAttribute("disabled", ""); // disables all remaining table-buttons so the player can not save (change) there value
  countTableScore();
  openLocks();
  ++playerArray[playerOrder].totalTurn;
  playerArray[playerOrder].turn = 0;
  document
    .getElementById("button-" + playerArray[playerOrder].playerId)
    .classList.remove("player-flash");
  let nextPlayerTurn = nextPlayer(playerId);
  document
    .getElementById("button-" + nextPlayerTurn)
    .removeAttribute("disabled");
  document
    .getElementById("button-" + nextPlayerTurn)
    .classList.add("player-flash");
  turnCount = 0;
  playerArray[playerOrder].turn = 0;
  document.getElementById("showTurn").textContent =
    "turn " + playerArray[playerOrder].turn + " of 3";
  ++playerArray[playerOrder].totalTurn;
  document
    .getElementById("button-" + playerId)
    .setAttribute("src", "assets/images/robot-pointing.webp");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * on last turn when there are no other options available than cross off
 */
function crossOff() {
  let playerId = playerArray[playerOrder].playerId;
  switch (true) {
    case canWrite("chance"):
      document.getElementById("chance" + playerId).textContent =
        turnScore.reduce(addTogether);
      document.getElementById("chance" + playerId).setAttribute("disabled", "");
      playerArray[playerOrder].chance = 0;
      endCpuTurnNext();
      break;
    case canWrite("fourOfKind"):
      document.getElementById("fourOfKind" + playerId).textContent = "0";
      document
        .getElementById("fourOfKind" + playerId)
        .setAttribute("disabled", "");
      playerArray[playerOrder].fourOfKind = 0;
      endCpuTurnNext();
      break;
    case canWrite("aces"):
      document.getElementById("aces" + playerId).textContent = "0";
      document.getElementById("aces" + playerId).setAttribute("disabled", "");
      playerArray[playerOrder].aces = 0;
      endCpuTurnNext();
      break;
    case canWrite("twos"):
      document.getElementById("twos" + playerId).textContent = "0";
      document.getElementById("twos" + playerId).setAttribute("disabled", "");
      playerArray[playerOrder].twos = 0;
      endCpuTurnNext();
      break;
    case canWrite("largeStraight"):
      document.getElementById("largeStraight" + playerId).textContent = "0";
      document
        .getElementById("largeStraight" + playerId)
        .setAttribute("disabled", "");
      playerArray[playerOrder].largeStraight = 0;
      endCpuTurnNext();
      break;
    case canWrite("yahtzee"):
      document.getElementById("yahtzee" + playerId).textContent = "0";
      document
        .getElementById("yahtzee" + playerId)
        .setAttribute("disabled", "");
      playerArray[playerOrder].yahtzee = 0;
      endCpuTurnNext();
      break;
    case canWrite("threes"):
      document.getElementById("threes" + playerId).textContent = "0";
      document.getElementById("threes" + playerId).setAttribute("disabled", "");
      playerArray[playerOrder].threes = 0;
      endCpuTurnNext();
      break;
    case canWrite("threeOfKind"):
      document.getElementById("threeOfKind" + playerId).textContent = "0";
      document
        .getElementById("threeOfKind" + playerId)
        .setAttribute("disabled", "");
      playerArray[playerOrder].threeOfKind = 0;
      endCpuTurnNext();
      break;
    case canWrite("fullHouse"):
      document.getElementById("fullHouse" + playerId).textContent = "0";
      document
        .getElementById("fullHouse" + playerId)
        .setAttribute("disabled", "");
      playerArray[playerOrder].fullHouse = 0;
      endCpuTurnNext();
      break;
    case canWrite("fours"):
      document.getElementById("fours" + playerId).textContent = "0";
      document.getElementById("fours" + playerId).setAttribute("disabled", "");
      playerArray[playerOrder].fours = 0;
      endCpuTurnNext();
      break;
    case canWrite("fives"):
      document.getElementById("fives" + playerId).textContent = "0";
      document.getElementById("fives" + playerId).setAttribute("disabled", "");
      playerArray[playerOrder].fives = 0;
      endCpuTurnNext();
      break;
    case canWrite("sixes"):
      document.getElementById("sixes" + playerId).textContent = "0";
      document.getElementById("sixes" + playerId).setAttribute("disabled", "");
      playerArray[playerOrder].sixes = 0;
      endCpuTurnNext();
      break;
    case canWrite("smallStraight"):
      document.getElementById("smallStraight" + playerId).textContent = "0";
      document
        .getElementById("smallStraight" + playerId)
        .setAttribute("disabled", "");
      playerArray[playerOrder].smallStraight = 0;
      endCpuTurnNext();
      break;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks if playerArray can take points
 * @param {string} points 'aces' twos' 'threes' 'fours' 'fives' 'sixes' 'threeOfKind' 'fourOfKind' 'fullHouse' 'smallStraight' 'largeStraight' 'yahtzee' 'chance'
 * @returns true if points have not been written into playerArray, otherwise false
 */
function canWrite(points) {
  return playerArray[playerOrder][points] === null;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// check yahtzee categories ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks if the dices qualify for yahtzee
 * @returns 'true' if it is yahtzee otherwise 'false'
 */
function isYahtzee() {
  for (let i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === 5) {
      return true;
    }
  }
  return false;
}
/**
 * 1. checks if the dices qualify small-straight
 * @returns 'true' if it is small-straight otherwise 'false'
 */
function isSmallStraight() {
  if (sortArray("ascendant", 4) === "1,2,3,4") {
    return true;
  } else if (sortArray("ascendant", 4) === "2,3,4,5") {
    return true;
  } else if (sortArray("descendant", 4) === "6,5,4,3") {
    return true;
  } else {
    return false;
  }
}
/**
 * 1. checks if the dices qualify for large-straight
 * @returns 'true' if it is large-straight otherwise 'false'
 */
function isLargeStraight() {
  if (sortArray("ascendant", false) === "1,2,3,4,5") {
    return true;
  } else if (sortArray("descendant", false) === "6,5,4,3,2") {
    return true;
  } else {
    return false;
  }
}
/**
 * 1. checks if the dices qualify for four-of-kind
 * @returns 'true' if it is four-of-kind otherwise 'false'
 */
function isFourOfKind() {
  for (let i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === 4) {
      return true;
    }
  }
  return false;
}
/**
 * 1. checks if the dices qualify for three-of-kind
 * @returns 'true' if it is three-of-kind otherwise 'false'
 */
function isThreeOfKind() {
  for (let i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (
      tempNumber.length === 3 ||
      tempNumber.length === 4 ||
      tempNumber.length === 5
    ) {
      return true;
    }
  }
  return false;
}
/**
 * 1. checks if the dices qualify for full-house
 * 2. needs diceArrayCount() function to create diceArrayCpu
 * @returns 'true' if it is full-house otherwise 'false'
 */
function isFullHouse() {
  let diceArrayCpu = diceArrayCount();
  for (let i = 0; i <= 5; i++) {
    let arrayLength = diceArrayCpu[i].length;
    if (arrayLength === 3) {
      for (let b = 0; b <= 5; b++) {
        arrayLength = diceArrayCpu[b].length;
        if (arrayLength === 2) {
          return true;
        }
      }
    }
  }
  return false;
}
/**
 * 1. checks how many times the number 'X' is at minimum diced
 * 2. needs diceArrayCount() function to create diceArrayCpu
 * @param {number} X the 'dice-number' which should be checked (1-6)
 * @param {number} times at least that many times (1-5)
 * @returns 'true' if the 'dice-number' is at lest 'times' diced otherwise 'false'
 */
function isXes(X, times) {
  let diceArrayCpu = diceArrayCount();
  if (diceArrayCpu[X].length >= times) {
    return true;
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// checks dice patterns /////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * checks if dice pattern is 'A' * factor (e.g. factor = 3 === A*3 === true)
 * @param {number} factor how many times 'A'
 * @returns 'true' if 'A' * factor otherwise 'false
 */
function isAxFactor(factor) {
  for (let i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === factor) {
      return true;
    }
  }
  return false;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks if dice pattern is A*3 and B*2 (same as isFullHouse())
 * 2. needs diceArrayCount() function to create diceArrayCpu
 * @returns 'true' if A*3 and B*2 otherwise 'false
 */
function isAxFactorBxFactor() {
  let diceArrayCpu = diceArrayCount();
  for (let i = 0; i <= 5; i++) {
    let arrayLength = diceArrayCpu[i].length;
    if (arrayLength === 3) {
      for (let b = 0; b <= 5; b++) {
        arrayLength = diceArrayCpu[b].length;
        if (arrayLength === 2) {
          return true;
        }
      }
    }
  }
  return false;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks the turnScore has a sequence of 3
 * @returns 'true' if dice have a sequence of 3 numbers, otherwise false
 */
function isABC() {
  let tempArray = [...turnScore];
  // take out doublications
  for (let i = 1; i <= 6; i++) {
    let tempNumber = tempArray.filter((point) => point === i);
    for (let b = 1; b <= 4; b++) {
      if (tempNumber.length > 1) {
        tempArray.splice(tempArray.indexOf(i), 1);
        tempNumber = tempArray.filter((point) => point === i);
      }
    }
  }
  let tempArrayReverse = [...tempArray];
  tempArray.sort((a, b) => a - b);
  tempArrayReverse.sort((a, b) => b - a);
  tempArray = tempArray.slice(0, 3);
  tempArrayReverse = tempArrayReverse.slice(0, 3);
  tempArray = tempArray.toString();
  tempArrayReverse = tempArrayReverse.toString();
  if (tempArray === "1,2,3") {
    return tempArray;
  } else if (tempArray === "2,3,4") {
    return tempArray;
  } else if (tempArray === "3,4,5") {
    return tempArray;
  } else if (tempArray === "4,5,6") {
    return tempArray;
  } else if (tempArrayReverse === "5,4,3") {
    return tempArrayReverse;
  } else if (tempArrayReverse === "6,5,4") {
    return tempArrayReverse;
  } else {
    return false;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks if a number is x times
 * 2. => diceArrayCount() creates new array tempArray from dice
 * @param {number} num which number
 * @param {number} times how many times
 * @returns 'true' if number is times included
 */
function isNumTimes(num, times) {
  let tempArray = diceArrayCount();
  if (tempArray[num - 1].length === times) {
    return true;
  } else {
    return false;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// useful functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. counts how many 1's , 2's ,... are in the turnScore
 * @returns multi diceArrayCpu containing info how many 1's, 2's, ...
 */
function diceArrayCount() {
  let diceArrayCpu = [
    [], // how many 1's
    [], // how many 2's
    [], // how many 3's
    [], // how many 4's
    [], // how many 5's
    [], // how many 6's
  ];
  for (let i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    diceArrayCpu[i - 1] = tempNumber;
  }
  return diceArrayCpu;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks how big the number is when added together
 * @param {number} repeat how many times repeated
 * @returns returns the sum of the repeated number
 */
function repeatNumbersSum(repeat) {
  let tempArray = diceArrayCount();
  for (let i = 0; i <= 6; i++) {
    if (tempArray[i] === repeat) {
      return (i + 1) * repeat;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks if an number is repeated
 * @param {number} repeat how many times repeated
 * @returns true or false
 */
function repeatNumbers(repeat) {
  let tempArray = diceArrayCount();
  for (let i = 0; i <= 6; i++) {
    if (tempArray[i] === repeat) {
      return true;
    } else {
      return false;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. cuts double and triple numbers from array
 * @param {array} array array of dice numbers
 * @returns shortened array if it had double or triple numbers
 */
function removeDoublesTriples(array) {
  for (let i = 1; i <= 6; i++) {
    let tempNumber = array.filter((point) => point === i);
    if (tempNumber.length === 2) {
      array.splice(array.indexOf(i), 1);
      for (let b = 1; i <= 6; b++) {
        let tempNumber2 = array.filter((point) => point === b);
        if (tempNumber2.length === 2) {
          array.splice(array.indexOf(b), 1);
        }
      }
    }
  }
  return array;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** 1. makes a copy of turnScore
 * 2. removes double numbers
 * 3. sorts numbers 'ascendant' / 'descendant'
 * @param {string} direction 'ascendant' numbers small to big,
 * 'descendant' numbers big to small
 *  @param {number} cut false === no cut, 4 === last number, 3 === cut last two, 2 === cut last three
 * @returns changed array as string string
 */
function sortArray(direction, cut) {
  let tempSortArray = [...turnScore];
  for (let i = 1; i <= 6; i++) {
    // remove double numbers
    let tempNumber = tempSortArray.filter((point) => point === i);
    if (tempNumber.length === 2) {
      tempSortArray.splice(tempSortArray.indexOf(i), 1);
    }
  }

  if (direction === "ascendant") {
    tempSortArray.sort((a, b) => a - b);
    if (cut) {
      tempSortArray = tempSortArray.slice(0, cut);
    }
    tempSortArray = tempSortArray.toString();
  }

  if (direction === "descendant") {
    tempSortArray.sort((a, b) => b - a);
    if (cut) {
      tempSortArray = tempSortArray.slice(0, cut);
    }
    tempSortArray = tempSortArray.toString();
  }

  return tempSortArray;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lock dice
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. locks the dices which appear x times (3 or 4), can not be rolled
 * 2. locks the icon of the dices
 * @param {number} number 3 or 4 of kind
 */
function lockXofKind(X) {
  let unlocked64 = "assets/images/icons/unlocked-64.png";
  let locked64 = "assets/images/icons/locked-64.png";
  let unlocked128 = "assets/images/icons/unlocked-128.png";
  let locked128 = "assets/images/icons/locked-128.png";
  for (let i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === X) {
      for (let b = 0; b < 5; b++) {
        if (turnScore[b] === i) {
          document
            .getElementById("dice" + (1 + b))
            .setAttribute("data-lock-open", "false");
          let tempLockPosition = document
            .getElementById("lock-" + (1 + b))
            .getAttribute("src");
          if (tempLockPosition === unlocked64) {
            document
              .getElementById("lock-" + (1 + b))
              .setAttribute("src", locked64);
          }
          if (tempLockPosition === unlocked128) {
            document
              .getElementById("lock-" + (1 + b))
              .setAttribute("src", locked128);
          }
        }
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. works only if the pattern is true
 * 2. needs sortArray() function
 * 3. needs arrayLocker() function
 * 4. looks dices (e.g. dice1) and changes icon to locked
 * @returns false if no sequence matches the pattern 1,2,3,4 or 2,3,4,5 or 6,5,4,3
 */
function lockABCD() {
  if (sortArray("ascendant", 4) === "1,2,3,4") {
    arrayLocker4("1,2,3,4");
  } else if (sortArray("ascendant", 4) === "2,3,4,5") {
    arrayLocker4("2,3,4,5");
  } else if (sortArray("descendant", 4) === "6,5,4,3") {
    arrayLocker4("6,5,4,3");
  } else {
    return false;
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. works only if the pattern is true
 * 2. needs sortArray() function
 * 3. needs arrayLocker() function
 * 4. looks dices (e.g. dice1) and changes icon to locked
 * @returns false if no sequence matches the pattern 1,2,3,4 or 2,3,4,5 or 6,5,4,3
 */
function lockABC() {
  let tempArray = isABC();
  arrayLocker4(tempArray);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. takes an array and locks one dice for each number
 * 2. it needs to be checked if this array exists first
 * 3. can now also check shorter arrays (e.g. '1,2' '1,2,3')
 * @param {array} arrayString sequence of '1,2,3,4' or '2,3,4,5' or '3,4,5,6'
 */
function arrayLocker4(arrayString) {
  let array = arrayString;
  array = array.split(",");
  let arraySize = array.length;
  let unlocked64 = "assets/images/icons/unlocked-64.png";
  let locked64 = "assets/images/icons/locked-64.png";
  let unlocked128 = "assets/images/icons/unlocked-128.png";
  let locked128 = "assets/images/icons/locked-128.png";
  for (let b = 0; b < arraySize; b++) {
    for (let i = 0; i < turnScore.length; i++) {
      if (turnScore[i] == array[0]) {
        array.shift();
        document
          .getElementById("dice" + (1 + i))
          .setAttribute("data-lock-open", "false");
        let tempLockPosition = document
          .getElementById("lock-" + (1 + i))
          .getAttribute("src");
        if (tempLockPosition === unlocked64) {
          document
            .getElementById("lock-" + (1 + i))
            .setAttribute("src", locked64);
        }
        if (tempLockPosition === unlocked128) {
          document
            .getElementById("lock-" + (1 + i))
            .setAttribute("src", locked128);
        }
      }
      continue;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. writes text into id="cpuText"
 * 2. runs a 'timer' to pass time
 * 3. optional end text can be set
 * 4. clears text (display id="cpuText" none)
 * @param {string} text text to be displayed first
 * @param {string} text2 optional (must be set '' if other arguments are used), last text after '... '
 * @param {number} interval how many seconds times 7 (default 1000 === 1 seconds, total length 6 seconds)
 */
function cpuText(text, text2 = "", interval = 1000) {
  const promise = new Promise((resolve) => {
    document.getElementById("robot_audio").play();
    let cpuText = document.getElementById("cpuText");
    let cpuTextClass = document.getElementById("cpuText").classList;
    cpuTextClass.toggle("noDisplay");
    cpuText.innerHTML = `${text}<br>`;
    const intervalStop = setInterval(timer, interval);

    let counter = 0;
    function timer() {
      ++counter;
      if (counter <= 2) {
        cpuText.innerHTML += "... ";
      } else if (counter === 3) {
        cpuText.innerHTML += `<br>${text2}`;
      } else if (counter > 6) {
        clearInterval(intervalStop);
        cpuTextClass.toggle("noDisplay");
        resolve(true);
      }
    }
  });
  return promise;
}
