/**
 * CPU player
 */
export function cpuPlayer() {
  console.log("hello I am the cpu");
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
  for (let i = 1; i <= 5; i++) {
    // checks which show class is applied to the dice id and saves its value into the turnScore array (=== dice result)
    let dicePosition = document.getElementById("dice" + i).classList;
    for (let z = 1; z <= 6; z++) {
      if (dicePosition.contains("show-" + z)) {
        originalTurnScore[i - 1] = z;
      }
    }
  }

  // check yahtzee categories ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
   * 1. 1. checks if the dices qualify for full-house
   * @returns 'true' if it is full-house otherwise 'false'
   */
  function isFullHouse() {
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
   * @param {number} X the 'dice-number' which should be checked (1-6)
   * @param {number} times at least that many times (1-5)
   * @returns 'true' if the 'dice-number' is at lest 'times' diced otherwise 'false'
   */
  function isXes(X, times) {
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
  /**
   * checks if dice pattern if if A*3 and B*2 (same as isFullHouse())
   * @returns 'true' if A*3 and B*2 otherwise 'false
   */
  function isAxFactorBxFactor() {
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
   * 1. checks the turnScore if it has a sequence of 3
   * @returns 'true' if dice have a sequence of 3 numbers, otherwise false
   */
  function isABC() {
    let tempSortArray = [...turnScore];
    tempSortArray = removeDoublesTriples(tempSortArray);
    tempSortArray.sort((a, b) => a - b);
    if (tempSortArray.length > 3) {
      tempSortArray.slice(0, 3);
    }
    tempSortArray = tempSortArray.toString();

    if (tempSortArray === "1,2,3") {
      return true;
    } else if (tempSortArray === "2,3,4") {
      return true;
    } else if (tempSortArray === "3,4,5") {
      return true;
    } else if (tempSortArray === "4,5,6") {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 1. checks if a number is x times divorced
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
    for (let i = 1; i <= 6; i++) {
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
    for (let i = 0; i <= 6; i++) {
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
    for (let i = 0; i <= 6; i++) {
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
  /**
   * on last turn when there are no other options available than cross off
   */
  function crossOff() {
    switch (true) {
      case ableChance:
        document.getElementById("chance" + playerId).textContent =
          turnScore.reduce(addTogether);
        document
          .getElementById("chance" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableFourOfKind:
        document.getElementById("fourOfKind" + playerId).textContent = "---";
        document
          .getElementById("fourOfKind" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableAces:
        document.getElementById("aces" + playerId).textContent = "---";
        document.getElementById("aces" + playerId).setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableTwos:
        document.getElementById("twos" + playerId).textContent = "---";
        document.getElementById("twos" + playerId).setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableLargeStraight:
        document.getElementById("largeStraight" + playerId).textContent = "---";
        document
          .getElementById("largeStraight" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableYahtzee:
        document.getElementById("yahtzee" + playerId).textContent = "---";
        document
          .getElementById("yahtzee" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableThrees:
        document.getElementById("threes" + playerId).textContent = "---";
        document
          .getElementById("threes" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableThreeOfKind:
        document.getElementById("threeOfKind" + playerId).textContent = "---";
        document
          .getElementById("threeOfKind" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableFullHouse:
        document.getElementById("fullHouse" + playerId).textContent = "---";
        document
          .getElementById("fullHouse" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableFours:
        document.getElementById("fours" + playerId).textContent = "---";
        document
          .getElementById("fours" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableFives:
        document.getElementById("fives" + playerId).textContent = "---";
        document
          .getElementById("fives" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableSixes:
        document.getElementById("sixes" + playerId).textContent = "---";
        document
          .getElementById("sixes" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
      case ableSmallStraight:
        document.getElementById("smallStraight" + playerId).textContent = "---";
        document
          .getElementById("smallStraight" + playerId)
          .setAttribute("disabled", "");
        endCpuTurnNext();
        break;
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////
  // CPU decision three //
  ////////////////////////
  // console.log("originalTurnScore " + originalTurnScore);
  turnScore = [6, 6, 6, 6, 6];
  console.log("test turn score is " + turnScore);
  let tempArray = diceArrayCount();
  console.log("test number is " + tempArray[6 - 1].length);

  function cpuDecisionThree() {
    if (isAxFactor(5)) {
      // Ax5
      console.log("5x is true");
      switch (true) {
        case ableYahtzee:
          writeScoreEndTurn("yahtzee");
          break;
        case ableSixes:
          if (isNumTimes(6, 5)) {
            writeScoreEndTurn("sixes");
          }
          break;
        case ableFives:
          if (isNumTimes(5, 5)) {
            writeScoreEndTurn("fives");
          }
          break;
        case ableFours:
          if (isNumTimes(4, 5)) {
            writeScoreEndTurn("fours");
          }
          break;
        case ableThrees:
          if (isNumTimes(3, 5)) {
            writeScoreEndTurn("threes");
          }
          break;
        case ableTwos:
          if (isNumTimes(2, 5)) {
            writeScoreEndTurn("twos");
          }
          break;
        case ableAces:
          if (isNumTimes(1, 5)) {
            writeScoreEndTurn("aces");
          }
          break;
      }
    } else if (true) {
      console.log(0);
    }
  }

  cpuDecisionThree();
  // function yahtzeeCategoryCheck() {
  //   // has yahtzee open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   if (ableYahtzee) {
  //     if (isYahtzee()) {
  //       writeScoreEndTurn("yahtzee");
  //     }
  //     // has largeStraight open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableLargeStraight) {
  //     if (isLargeStraight()) {
  //       writeScoreEndTurn("largeStraight");
  //     }
  //     // has smallStraight open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableSmallStraight) {
  //     if (isSmallStraight()) {
  //       writeScoreEndTurn("smallStraight");
  //     }
  //     // has fullHouse open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableFullHouse) {
  //     if (isFullHouse()) {
  //       writeScoreEndTurn("fullHouse");
  //     }
  //     // has sixes open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableSixes) {
  //     if (isSixes()) {
  //       writeScoreEndTurn("sixes");
  //     }
  //     // has fives open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableFives) {
  //     if (isFives()) {
  //       writeScoreEndTurn("fives");
  //     }
  //     // has fours open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableFours) {
  //     if (isFours()) {
  //       writeScoreEndTurn("fours");
  //     }
  //     // has fourOfKind open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableFourOfKind) {
  //     if (isFourOfKind()) {
  //       writeScoreEndTurn("fourOfKind");
  //     }
  //     // has threeOfKind open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableThreeOfKind) {
  //     if (isThreeOfKind()) {
  //       writeScoreEndTurn("threeOfKind");
  //     }
  //     // has threes open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableThrees) {
  //     if (isThrees()) {
  //       writeScoreEndTurn("threes");
  //     }
  //     // has twos open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableTwos) {
  //     if (isTwos()) {
  //       writeScoreEndTurn("twos");
  //     }
  //     // has aces open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //   } else if (ableAces) {
  //     if (isAces()) {
  //       writeScoreEndTurn("aces");
  //     }
  //     // has chance open ? //////////////////////////////////////////////////////////////////////////////////////////////////
  //     // } else if (ableChance) {
  //     //   if (isChance()) {
  //     //     writeScoreEndTurn("chance");
  //     //   }
  //   }
  // }

  // function whatDiceRoll() {}
}
