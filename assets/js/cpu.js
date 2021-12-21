// determents if points have already been written into table
let ableYahtzee = document
  .getElementById("yahtzee" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableLargeStraight = document
  .getElementById("largeStraight" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableSmallStraight = document
  .getElementById("smallStraight" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableFullHouse = document
  .getElementById("fullHouse" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableSixes = document
  .getElementById("sixes" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableFives = document
  .getElementById("fives" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableFours = document
  .getElementById("fours" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableFourOfKind = document
  .getElementById("fourOfKind" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableThreeOfKind = document
  .getElementById("threeOfKind" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableThrees = document
  .getElementById("threes" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableTwos = document
  .getElementById("twos" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableAces = document
  .getElementById("aces" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;
let ableChance = document
  .getElementById("chance" + playerId)
  .hasAttribute("disabled")
  ? false
  : true;

// to count dice score together
const addTogether = (previousValue, currentValue) =>
  previousValue + currentValue;

// original dice order
let originalTurnScore = [];
for (i = 1; i <= 5; i++) {
  // checks which show class is applied to the dice id and saves its value into the turnScore array (=== dice result)
  let dicePosition = document.getElementById("dice" + i).classList;
  for (z = 1; z <= 6; z++) {
    if (dicePosition.contains("show-" + z)) {
      originalTurnScore[i - 1] = z;
    }
  }
}
console.log("originalTurnScore " + originalTurnScore);
turnScore = [1, 1, 1, 1, 1];
console.log("test turn score is " + turnScore);

// functions //////////////////////////////////////////
function isYahtzee() {
  for (i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === 5) {
      return true;
    }
  }
  return false;
}

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

function isLargeStraight() {
  if (sortArray("ascendant", false) === "1,2,3,4,5") {
    return true;
  } else if (sortArray("descendant", false) === "6,5,4,3,2") {
    return true;
  } else {
    return false;
  }
}

function isFourOfKind() {
  // add yahtzee ? || tempNumber.length === 6
  for (i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === 4 || tempNumber.length === 5) {
      return true;
    }
  }
  return false;
}

function istTreeOfKind() {
  // add yahtzee ? || tempNumber.length === 6
  for (i = 1; i <= 6; i++) {
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

function isFullHouse() {
  for (i = 0; i <= 5; i++) {
    let arrayLength = diceArrayCpu[i].length;
    if (arrayLength === 3) {
      for (b = 0; b <= 5; b++) {
        arrayLength = diceArrayCpu[b].length;
        if (arrayLength === 2) {
          return true;
        }
      }
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. writes points into the table
 * 2. disables button in which points are written
 * 3. => calls the endCpuTurnNext(), which ends turn and starts next player
 * @param {string} type point category (e.g. yahtzee)
 */
function writeScoreEndTurn(type) {
  let tableId = document.getElementById(type + playerId);
  switch (type) {
    case "yahtzee":
      tableId.textContent = 50;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "largeStraight":
      tableId.textContent = 40;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "smallStraight":
      tableId.textContent = 30;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fullHouse":
      tableId.textContent = 25;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "sixes":
      tableId.textContent = diceArrayCount()[5].length * 6;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fives":
      tableId.textContent = diceArrayCount()[4].length * 5;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fours":
      tableId.textContent = diceArrayCount()[3].length * 4;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "fourOfKind":
      tableId.textContent = turnScore.reduce(addTogether);
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "threeOfKind":
      tableId.textContent = turnScore.reduce(addTogether);
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "threes":
      tableId.textContent = diceArrayCount()[2].length * 3;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "twos":
      tableId.textContent = diceArrayCount()[1].length * 2;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
    case "aces":
      tableId.textContent = diceArrayCount()[0].length * 1;
      tableId.setAttribute("disabled", "");
      endCpuTurnNext();
      break;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. makes a copy of turnScore
 * 2. removes double numbers
 * 3. sorts numbers 'ascendant' / 'descendant'
 * @param {string} direction 'ascendant' numbers small to big,
 * 'descendant' numbers big to small
 *  @param {number} cut false === no cut, 4 === last number, 3 === cut last two, 2 === cut last three
 * @returns changed array as string string
 */
function sortArray(direction, cut) {
  let tempSortArray = [...turnScore];
  for (i = 1; i <= 6; i++) {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  for (i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    diceArrayCpu[i - 1] = tempNumber;
  }
  return diceArrayCpu;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks if an number is repeated
 * @param {number} repeat how many times repeated
 * @returns true or false
 */
function repeatNumbers(repeat) {
  let tempArray = diceArrayCount();
  for (i = 0; i <= 6; i++) {
    if (tempArray[i] === repeat) {
      return true;
    } else {
      return false;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. checks how big the number is when added together
 * @param {number} repeat how many times repeated
 * @returns returns the sum of the repeated number
 */
function repeatNumbersSum(repeat) {
  let tempArray = diceArrayCount();
  for (i = 0; i <= 6; i++) {
    if (tempArray[i] === repeat) {
      return (i + 1) * repeat;
    }
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
  document.getElementById("button-" + playerId).setAttribute("disabled", ""); // disables all remaining table-buttons so the player can not save (change) there value
  countTableScore();
  openLocks();
  let nextPlayerTurn = nextPlayer(playerId);
  document
    .getElementById("button-" + nextPlayerTurn)
    .removeAttribute("disabled");
  turnCount = 0;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cpuDecisionThree(diceArray) {}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////
// CPU decision three //
////////////////////////
// has yahtzee open ? //////////////////////////////////////////////////////////////////////////////////////////////////
if (ableYahtzee) {
  if (isYahtzee()) {
    writeScoreEndTurn("yahtzee");
  }
  // has largeStraight open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableLargeStraight) {
  // has smallStraight open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableSmallStraight) {
  // has fullHouse open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableFullHouse) {
  // has sixes open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableSixes) {
  // has fives open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableFives) {
  // has fours open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableFours) {
  // has fourOfKind open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableFourOfKind) {
  // has threeOfKind open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableThreeOfKind) {
  // has threes open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableThrees) {
  // has twos open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableTwos) {
  // has aces open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableAces) {
  // has chance open ? //////////////////////////////////////////////////////////////////////////////////////////////////
} else if (ableChance) {
}
