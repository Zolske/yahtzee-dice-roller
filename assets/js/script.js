/* many thanks to Lena Stanley from https://lenadesign.org/2020/06/18/roll-the-dice/ ,
the dices and the animation is based on here code!
There are two problems in the base code you need to:
1. add to css (the sides of the dice are not attached when animation runs):
html {font-size: 62.5%;} // add
2. remove from JavaScript (the function rollDice() is called endless and is only stopped through the browser):
setTimeout(rollDice(), 1000); // remove
Update: the code is based now on CHRIS GODBER  https://icodemag.com/3d-rolling-dice-css-javascript/ and the design on Lena Stanleys dice
*/

// global variable //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let turnCount = null; // counts how many turns the player has played, max 3, see playTurn()
let turnScore = []; //the dice score after ever turn
let playerArray = []; // contains the players of the game
let playerId;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. generates a random number (randomDiceNumber = 1-6)
 * 2. to the dice who's id was passed as argument (diceId):
 *      - removes all classes of 'show-[1-6]'
 *      - adds a class of 'show-[+randomDiceNumber] (is the visible number on the page)
 * @param {string} diceId id of the dice (there are 5 dices) in the html (e.g. 'dice1')
 */
function diceRoller(diceId) {
  let dice = document.getElementById(diceId); // gets the element of the dice who's id was passed as argument
  let randomDiceNumber = Math.floor(Math.random() * 6 + 1); // generates the random dice number 1-6

  for (i = 1; i <= 6; i++) {
    // removes all classes of 'show-[1-6]
    dice.classList.remove("show-" + i);
  }

  dice.classList.add("show-" + randomDiceNumber); // adds the show-[randomNumber] to the dice who's id is passed as argument
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. rolls only the dices with the attribute data-lock-open === 'true'
 * 2. => calls diceRoller() function which rolls the individual dice
 */
function buttonDiceRoller() {
  let dice1 = document.getElementById("dice1").getAttribute("data-lock-open");
  let dice2 = document.getElementById("dice2").getAttribute("data-lock-open");
  let dice3 = document.getElementById("dice3").getAttribute("data-lock-open");
  let dice4 = document.getElementById("dice4").getAttribute("data-lock-open");
  let dice5 = document.getElementById("dice5").getAttribute("data-lock-open");

  if (dice1 === "true") {
    diceRoller("dice1");
  }
  if (dice2 === "true") {
    diceRoller("dice2");
  }
  if (dice3 === "true") {
    diceRoller("dice3");
  }
  if (dice4 === "true") {
    diceRoller("dice4");
  }
  if (dice5 === "true") {
    diceRoller("dice5");
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. changes the lock image (icon) locked / unlocked,
 * 2. sets the data-lock-open attribute on the dice id accordantly to false or true
 */
function changeLock() {
  let unlocked64 = "assets/images/icons/unlocked-64.png";
  let locked64 = "assets/images/icons/locked-64.png";
  let unlocked128 = "assets/images/icons/unlocked-128.png";
  let locked128 = "assets/images/icons/locked-128.png";
  let currentPosition = this.getAttribute("src");

  if (currentPosition === unlocked64) {
    this.setAttribute("src", locked64);
    if (this.matches("#lock-1")) {
      document.getElementById("dice1").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-2")) {
      document.getElementById("dice2").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-3")) {
      document.getElementById("dice3").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-4")) {
      document.getElementById("dice4").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-5")) {
      document.getElementById("dice5").setAttribute("data-lock-open", "false");
    }
  } else if (currentPosition === locked64) {
    this.setAttribute("src", unlocked64);
    if (this.matches("#lock-1")) {
      document.getElementById("dice1").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-2")) {
      document.getElementById("dice2").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-3")) {
      document.getElementById("dice3").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-4")) {
      document.getElementById("dice4").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-5")) {
      document.getElementById("dice5").setAttribute("data-lock-open", "true");
    }
  } else if (currentPosition === unlocked128) {
    this.setAttribute("src", locked128);
    if (this.matches("#lock-1")) {
      document.getElementById("dice1").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-2")) {
      document.getElementById("dice2").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-3")) {
      document.getElementById("dice3").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-4")) {
      document.getElementById("dice4").setAttribute("data-lock-open", "false");
    } else if (this.matches("#lock-5")) {
      document.getElementById("dice5").setAttribute("data-lock-open", "false");
    }
  } else if (currentPosition === locked128) {
    this.setAttribute("src", unlocked128);
    if (this.matches("#lock-1")) {
      document.getElementById("dice1").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-2")) {
      document.getElementById("dice2").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-3")) {
      document.getElementById("dice3").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-4")) {
      document.getElementById("dice4").setAttribute("data-lock-open", "true");
    } else if (this.matches("#lock-5")) {
      document.getElementById("dice5").setAttribute("data-lock-open", "true");
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. opens all locks, changes icon to unlocked and attribute to 'data-lock-open'
 */
function openLocks() {
  let unlocked64 = "assets/images/icons/unlocked-64.png";
  let locked64 = "assets/images/icons/locked-64.png";
  let unlocked128 = "assets/images/icons/unlocked-128.png";
  let locked128 = "assets/images/icons/locked-128.png";
  let lockImageSize = document.getElementById("lock-1").getAttribute("src");

  for (i = 1; i <= 5; i++) {
    document.getElementById("dice" + i).setAttribute("data-lock-open", "true");
    if (lockImageSize === locked64 || lockImageSize === unlocked64) {
      tempImag = document
        .getElementById("lock-" + i)
        .setAttribute("src", unlocked64);
    }
    if (lockImageSize === locked128 || lockImageSize === unlocked128) {
      document.getElementById("lock-" + i).setAttribute("src", unlocked128);
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. increments the turn counter (max 3)
 * 2. => calls the function (buttonDiceRoller()) to roll dices (which are unlocked)
 * 3. reads the value of all 5 dices (from the html dice[1-5] id) and assigns it to the 'turnScore[]' array
 * 4. => calls the function writeScoreTable()
 */
function playTurn() {
  turnCount = turnCount >= 3 ? 1 : ++turnCount;
  if (turnCount === 3) {
    // disable the button which rolls the dice after 3 turns
    document.getElementById("button-" + playerId).setAttribute("disabled", "");
  }
  console.log("turn counter " + turnCount);
  buttonDiceRoller();

  for (i = 1; i <= 5; i++) {
    let dicePosition = document.getElementById("dice" + i).classList;
    for (z = 1; z <= 6; z++) {
      if (dicePosition.contains("show-" + z)) {
        // gets the dice result from the dice id (e.g. dice1) and checks which 'show-'+? class it has,
        turnScore[i - 1] = z; // the number of the show class (show-1 == dice shows 1) is the dice number which is saved into the 'turnScore[]' array
      }
    }
  }
  writeScoreTable();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. creates a column in the score table based on player id and player name
 * 2. => addEventListener('click', function () {playTurn(playerId);}); to id('button-' + playerId)
 * @param {string} playerId id of the player (formatted player name)
 * @param {string} playerName name of the player (unformatted player name)
 */
function createTableRow(playerName) {
  let tableDataUpper = [
    "aces",
    "twos",
    "threes",
    "fours",
    "fives",
    "sixes",
    "totalTop",
    "bonusTop",
    "totalUpper",
  ];
  let tableUpper = document.getElementById("table-upper");
  let tableDataLower = [
    "threeOfKind",
    "fourOfKind",
    "fullHouse",
    "smallStraight",
    "largeStraight",
    "yahtzee",
    "chance",
    "totalLower",
    "copyTotalUpper",
    "total",
  ];
  let tableLower = document.getElementById("table-lower");

  let tableHead = document.createElement("th");
  tableHead.textContent = "Player";
  document.getElementById("table-head").appendChild(tableHead);

  let tablePlayerName = document.createElement("th");
  tablePlayerName.textContent = playerName;
  document.getElementById("table-player-name").appendChild(tablePlayerName);

  for (i = 0; i < tableDataUpper.length; i++) {
    let tempTableElement = document.createElement("th");
    if (
      tableDataUpper[i] === "totalTop" ||
      tableDataUpper[i] === "bonusTop" ||
      tableDataUpper[i] === "totalUpper"
    ) {
      tempTableElement.textContent = "---";
      tempTableElement.setAttribute("id", tableDataUpper[i] + playerId);
    } else {
      let tempButton = document.createElement("button");
      tempButton.classList.add("table-button");
      tempButton.textContent = "---";
      tempButton.setAttribute("id", tableDataUpper[i] + playerId);
      tempTableElement.appendChild(tempButton);
    }
    tableUpper.children[i].appendChild(tempTableElement);
  }

  for (i = 0; i < tableDataLower.length; i++) {
    let tempTableElement = document.createElement("th");
    if (
      tableDataLower[i] === "totalLower" ||
      tableDataLower[i] === "copyTotalUpper" ||
      tableDataLower[i] === "total"
    ) {
      tempTableElement.textContent = "---";
      tempTableElement.setAttribute("id", tableDataLower[i] + playerId);
    } else {
      let tempButton = document.createElement("button");
      tempButton.classList.add("table-button");
      tempButton.textContent = "---";
      tempButton.setAttribute("id", tableDataLower[i] + playerId);
      tempTableElement.appendChild(tempButton);
    }
    tableLower.children[i].appendChild(tempTableElement);
  }

  let playerPlayButton = document.createElement("button");
  playerPlayButton.textContent = playerName;
  playerPlayButton.setAttribute("id", "button-" + playerId);
  document.getElementById("button-play-place").appendChild(playerPlayButton);

  document
    .getElementById("button-" + playerId)
    .addEventListener("click", function () {
      playTurn();
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. creates the 'playerId' by prompting the user to enter there name
 * 2. adds the 'playerId' to the 'playerArray' array
 * 3. => calls the 'createTableRow()' function to create a new column based on the player id and player name
 * 4. disables all other (not the first player) player buttons
 */
function newPlayer() {
  let promptMessage = "Please enter your name ";
  let playerName;
  // let playerId;

  for (i = 1; i < 10; i++) {
    playerName = prompt(`${promptMessage}`, `Player ${i}`);
    playerId = playerName.replace(/\s/g, ""); // remove space from player string to be used as id
    if (!playerArray.includes(playerId)) {
      // check if name is already taken
      playerArray.push(playerId); // adds name / 'playerId' to 'playerArray'
      break;
    }
    promptMessage = "The name "; // changes prompt message to inform user which names have been taken
    for (b = 0; b < playerArray.length; b++) {
      promptMessage += `"${playerArray[b]}" `;
    }
    promptMessage += "is already taken! Please choose a different name";
  }

  createTableRow(playerName);

  for (i = 1; i < playerArray.length; i++) {
    // !do not include the first player (i===1), disables all other new player buttons
    let otherPlayer = playerArray[i];
    playerId = playerArray[0];
    document
      .getElementById("button-" + otherPlayer)
      .setAttribute("disabled", "");
  }
  console.log("playerId " + playerId);
  console.log("playerArray " + playerArray);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. analyse dice numbers (taken from 'show-[1-6]' class) and saves in 'turnScore'
 * 2. sets table buttons to 'flash' (glow), if they can take points (not disabled and full fill criteria (yahtzee, full house, ...))
 * 3. => addEventListener('click', function () {savePointsTable(this, playerId);}); to all buttons the class of 'table-button--flash'
 * @param {string} playerId id of the player (formatted player name)
 */
function writeScoreTable() {
  for (i = 1; i <= 5; i++) {
    // checks which show class is applied to the dice id and saves its value into the turnScore array (=== dice result)
    let dicePosition = document.getElementById("dice" + i).classList;
    for (z = 1; z <= 6; z++) {
      if (dicePosition.contains("show-" + z)) {
        turnScore[i - 1] = z;
      }
    }
  }
  let allButtonPlayer = [];
  let chance;
  let yahtzee;
  let fourOfKind;
  let threeOfKind;
  let fullHouse;
  let smallStraight;
  let largeStraight;
  let sixes;
  let fives;
  let fours;
  let threes;
  let twos;
  let aces;

  // turnScore = [3, 6, 4, 2, 5]; // test dice numbers, overwrites random generated numbers

  // >>> find out if there is a chance /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const addTogether = (previousValue, currentValue) =>
    previousValue + currentValue; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let chanceElement = document.getElementById("chance" + playerId);
  allButtonPlayer.push(chanceElement);
  if (!chanceElement.hasAttribute("disabled")) {
    // if no 'disabled', points are writer into table and button flashes
    chanceElement.textContent = turnScore.reduce(addTogether);
    chanceElement.classList.add("table-button--flash");
  }

  // >>> find out if there is a yahtzee /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let yahtzeeElement = document.getElementById("yahtzee" + playerId);
  allButtonPlayer.push(yahtzeeElement);
  for (i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === 5) {
      yahtzee = true;
      if (!yahtzeeElement.hasAttribute("disabled")) {
        yahtzeeElement.textContent = 50;
        yahtzeeElement.classList.add("table-button--flash");
      }
      break;
    } else {
      yahtzee = false;
      if (!yahtzeeElement.hasAttribute("disabled")) {
        yahtzeeElement.textContent = "---";
        yahtzeeElement.classList.remove("table-button--flash");
      }
    }
  }

  // >>> find out if there is a fourOfKind /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let fourOfKindElement = document.getElementById("fourOfKind" + playerId);
  allButtonPlayer.push(fourOfKindElement);
  for (i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (tempNumber.length === 4 || tempNumber.length === 5) {
      fourOfKind = true;
      if (!fourOfKindElement.hasAttribute("disabled")) {
        fourOfKindElement.textContent = turnScore.reduce(addTogether);
        fourOfKindElement.classList.add("table-button--flash");
      }
      break;
    } else {
      fourOfKind = false;
      if (!fourOfKindElement.hasAttribute("disabled")) {
        fourOfKindElement.textContent = "---";
        fourOfKindElement.classList.remove("table-button--flash");
      }
    }
  }

  // >>> find out if there is a threeOfKind /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let threeOfKindElement = document.getElementById("threeOfKind" + playerId);
  allButtonPlayer.push(threeOfKindElement);
  for (i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    if (
      tempNumber.length === 3 ||
      tempNumber.length === 4 ||
      tempNumber.length === 5
    ) {
      threeOfKind = true;
      if (!threeOfKindElement.hasAttribute("disabled")) {
        threeOfKindElement.textContent = turnScore.reduce(addTogether);
        threeOfKindElement.classList.add("table-button--flash");
      }
      break;
    } else {
      threeOfKind = false;
      if (!threeOfKindElement.hasAttribute("disabled")) {
        threeOfKindElement.textContent = "---";
        threeOfKindElement.classList.remove("table-button--flash");
      }
    }
  }

  // >>> find out if there is a fullHouse /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let fullHouseElement = document.getElementById("fullHouse" + playerId);
  allButtonPlayer.push(fullHouseElement);
  let bigArray = [[], [], [], [], [], []];
  for (i = 1; i <= 6; i++) {
    let tempNumber = turnScore.filter((point) => point === i);
    bigArray[i - 1] = tempNumber;
  }
  breakLoop: for (i = 0; i <= 5; i++) {
    let arrayLength = bigArray[i].length;
    if (arrayLength === 3) {
      for (b = 0; b <= 5; b++) {
        arrayLength = bigArray[b].length;
        if (arrayLength === 2) {
          fullHouse = true;
          if (!fullHouseElement.hasAttribute("disabled")) {
            fullHouseElement.textContent = 25;
            fullHouseElement.classList.add("table-button--flash");
          }
          break breakLoop;
        } else {
          fullHouse = false;
          if (!fullHouseElement.hasAttribute("disabled")) {
            fullHouseElement.textContent = "---";
            fullHouseElement.classList.remove("table-button--flash");
          }
        }
      }
    } else {
      fullHouse = false;
      if (!fullHouseElement.hasAttribute("disabled")) {
        fullHouseElement.textContent = "---";
        fullHouseElement.classList.remove("table-button--flash");
      }
    }
  }

  // >>> find out if there is a smallStraight /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let smallStraightElement = document.getElementById(
    "smallStraight" + playerId
  );
  allButtonPlayer.push(smallStraightElement);
  let tempSmallSortAscendant = [...turnScore];
  let tempSmallSortDescendant = [...turnScore];

  for (i = 1; i <= 6; i++) {
    // remove double numbers
    let tempNumber = tempSmallSortAscendant.filter((point) => point === i);
    if (tempNumber.length === 2) {
      tempSmallSortAscendant.splice(tempSmallSortAscendant.indexOf(i), 1);
      tempSmallSortDescendant = tempSmallSortAscendant;
    }
  }

  tempSmallSortAscendant.sort((a, b) => a - b);
  tempSmallSortAscendant = tempSmallSortAscendant.slice(0, 4);
  tempSmallSortAscendant = tempSmallSortAscendant.toString();

  tempSmallSortDescendant.sort((a, b) => b - a);
  tempSmallSortDescendant = tempSmallSortDescendant.slice(0, 4);
  tempSmallSortDescendant = tempSmallSortDescendant.toString();

  if (tempSmallSortAscendant === "1,2,3,4") {
    smallStraight = true;
  } else if (tempSmallSortAscendant === "2,3,4,5") {
    smallStraight = true;
  } else if (tempSmallSortDescendant === "6,5,4,3") {
    smallStraight = true;
  } else {
    smallStraight = false;
  }

  // >>> if no 'disabled', points are writer into table and button flashes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!smallStraightElement.hasAttribute("disabled")) {
    if (smallStraight) {
      smallStraightElement.textContent = 30;
      smallStraightElement.classList.add("table-button--flash");
    } else {
      smallStraightElement.textContent = "---";
      smallStraightElement.classList.remove("table-button--flash");
    }
  }

  // >>> find out if there is a largeStraight /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let largeStraightElement = document.getElementById(
    "largeStraight" + playerId
  );
  allButtonPlayer.push(largeStraightElement);
  let templargeSortAscendant = turnScore;

  templargeSortAscendant.sort((a, b) => a - b);
  templargeSortAscendant = templargeSortAscendant.toString();

  if (templargeSortAscendant === "1,2,3,4,5") {
    largeStraight = true;
  } else if (templargeSortAscendant === "2,3,4,5,6") {
    largeStraight = true;
  } else {
    largeStraight = false;
  }

  // if >>> no 'disabled', points are writer into table and button flashes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!largeStraightElement.hasAttribute("disabled")) {
    if (largeStraight) {
      largeStraightElement.textContent = 40;
      largeStraightElement.classList.add("table-button--flash");
    } else {
      largeStraightElement.textContent = "---";
      largeStraightElement.classList.remove("table-button--flash");
    }
  }

  // >>> find out if upper section is true /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let acesElement = document.getElementById("aces" + playerId);
  allButtonPlayer.push(acesElement);
  let twosElement = document.getElementById("twos" + playerId);
  allButtonPlayer.push(twosElement);
  let threesElement = document.getElementById("threes" + playerId);
  allButtonPlayer.push(threesElement);
  let foursElement = document.getElementById("fours" + playerId);
  allButtonPlayer.push(foursElement);
  let fivesElement = document.getElementById("fives" + playerId);
  allButtonPlayer.push(fivesElement);
  let sixesElement = document.getElementById("sixes" + playerId);
  allButtonPlayer.push(sixesElement);
  let tempUpperArray = [[], [], [], [], [], []];
  for (i = 1; i <= 6; i++) {
    tempUpperArray[i - 1] = turnScore.filter((point) => point === i);
    if (tempUpperArray[0].length >= 1) {
      aces = true;
      if (!acesElement.hasAttribute("disabled")) {
        acesElement.textContent = tempUpperArray[0].length * 1;
        acesElement.classList.add("table-button--flash");
      }
    } else {
      aces = false;
      if (!acesElement.hasAttribute("disabled")) {
        acesElement.textContent = "---";
        acesElement.classList.remove("table-button--flash");
      }
    }

    if (tempUpperArray[1].length >= 1) {
      twos = true;
      if (!twosElement.hasAttribute("disabled")) {
        twosElement.textContent = tempUpperArray[1].length * 2;
        twosElement.classList.add("table-button--flash");
      }
    } else {
      twos = false;
      if (!twosElement.hasAttribute("disabled")) {
        twosElement.textContent = "---";
        twosElement.classList.remove("table-button--flash");
      }
    }

    if (tempUpperArray[2].length >= 1) {
      threes = true;
      if (!threesElement.hasAttribute("disabled")) {
        threesElement.textContent = tempUpperArray[2].length * 3;
        threesElement.classList.add("table-button--flash");
      }
    } else {
      threes = false;
      if (!threesElement.hasAttribute("disabled")) {
        threesElement.textContent = "---";
        threesElement.classList.remove("table-button--flash");
      }
    }

    if (tempUpperArray[3].length >= 1) {
      fours = true;
      if (!foursElement.hasAttribute("disabled")) {
        foursElement.textContent = tempUpperArray[3].length * 4;
        foursElement.classList.add("table-button--flash");
      }
    } else {
      fours = false;
      if (!foursElement.hasAttribute("disabled")) {
        foursElement.textContent = "---";
        foursElement.classList.remove("table-button--flash");
      }
    }

    if (tempUpperArray[4].length >= 1) {
      fives = true;
      if (!fivesElement.hasAttribute("disabled")) {
        fivesElement.textContent = tempUpperArray[4].length * 5;
        fivesElement.classList.add("table-button--flash");
      }
    } else {
      fives = false;
      if (!fivesElement.hasAttribute("disabled")) {
        fivesElement.textContent = "---";
        fivesElement.classList.remove("table-button--flash");
      }
    }

    if (tempUpperArray[5].length >= 1) {
      sixes = true;
      if (!sixesElement.hasAttribute("disabled")) {
        sixesElement.textContent = tempUpperArray[5].length * 6;
        sixesElement.classList.add("table-button--flash");
      }
    } else {
      sixes = false;
      if (!sixesElement.hasAttribute("disabled")) {
        sixesElement.textContent = "---";
        sixesElement.classList.remove("table-button--flash");
      }
    }
  }

  // console.log('<<< start test dice roll category <<<')
  // console.log('the dice show ' + turnScore);
  // console.log('the yahtzee is ' + yahtzee);
  // console.log('the fourOfKind is ' + fourOfKind);
  // console.log('the threeOfKind is ' + threeOfKind);
  // console.log('the fullHouse is ' + fullHouse);
  // console.log('the smallStraight is ' + smallStraight);
  // console.log('the largeStraight is ' + largeStraight);
  // console.log('the aces is ' + aces);
  // console.log('the twos is ' + twos);
  // console.log('the threes is ' + threes);
  // console.log('the fours is ' + fours);
  // console.log('the fives is ' + fives);
  // console.log('the sixes is ' + sixes);
  // console.log('>>> end >>>')

  for (i = 0; i < allButtonPlayer.length; i++) {
    if (!allButtonPlayer[i].hasAttribute("disabled")) {
      allButtonPlayer[i].addEventListener("click", savePointsTable);
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. changes to the next player (playerArray)
 * @param {string} playerId  id of the player (formatted player name)
 * @returns returns the id of the player who's next turn it is going to be
 */
function nextPlayer() {
  const currentPlayer = (element) => element === playerId;
  let playerPosition = playerArray.findIndex(currentPlayer);
  let arrayLength = playerArray.length - 1;

  if (playerPosition < arrayLength) {
    ++playerPosition;
  } else {
    playerPosition = 0;
  }
  playerId = playerArray[playerPosition];
  if (playerId === "CPU") {
    console.log("fuck it is the CPU");
    cpuPlayer();
  }
  return playerArray[playerPosition];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 1. is applied to the button in the list which flashes and receives a click event,
 * 2. saves the score, in the score table
 * 3. removes table-button--flash === flashing button,
 * 4. end the players turn
 * 5. => calls countTableScore(playerId), counts points in the table together
 * 6. => calls openLocks(), opens all locks
 * @param {*} thisButton the button on which the click event happened
 * @param {string} playerId id of the player
 */
function savePointsTable() {
  // disables the clicked button and therefore saves the score because it is not part of the loop below
  this.setAttribute("disabled", "");
  this.classList.remove("table-button--flash");

  let tableButtonFlash = document.getElementsByClassName("table-button--flash");
  const flashLength = tableButtonFlash.length;
  for (i = 0; i < flashLength; i++) {
    tableButtonFlash[0].textContent = "---";
    tableButtonFlash[0].classList.remove("table-button--flash");
    // tableButtonFlash[0].removeEventListener('click', savePointsTable(this, playerId));
  }

  let allTableButtons = document.getElementsByClassName("table-button");
  for (i = 0; i < allTableButtons.length; i++) {
    allTableButtons[i].removeEventListener("click", savePointsTable);
  }

  document.getElementById("button-" + playerId).setAttribute("disabled", ""); // disables all remaining table-buttons so the player can not save (change) there value
  countTableScore();
  openLocks();

  let nextPlayerTurn = nextPlayer(playerId);
  document
    .getElementById("button-" + nextPlayerTurn)
    .removeAttribute("disabled");
  turnCount = 0;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. count table score and update totals
 */
function countTableScore() {
  let totalTop = 0;
  let acesElement = parseInt(
    document.getElementById("aces" + playerId).textContent
  );
  let twosElement = parseInt(
    document.getElementById("twos" + playerId).textContent
  );
  let threesElement = parseInt(
    document.getElementById("threes" + playerId).textContent
  );
  let foursElement = parseInt(
    document.getElementById("fours" + playerId).textContent
  );
  let fivesElement = parseInt(
    document.getElementById("fives" + playerId).textContent
  );
  let sixesElement = parseInt(
    document.getElementById("sixes" + playerId).textContent
  );
  if (!isNaN(acesElement)) {
    totalTop += acesElement;
  }
  if (!isNaN(twosElement)) {
    totalTop += twosElement;
  }
  if (!isNaN(threesElement)) {
    totalTop += threesElement;
  }
  if (!isNaN(foursElement)) {
    totalTop += foursElement;
  }
  if (!isNaN(fivesElement)) {
    totalTop += fivesElement;
  }
  if (!isNaN(sixesElement)) {
    totalTop += sixesElement;
  }
  document.getElementById("totalTop" + playerId).textContent = totalTop;
  let bonusTop = (document.getElementById("bonusTop" + playerId).textContent =
    totalTop > 62 ? 35 : "---");
  let totalUpper = (document.getElementById(
    "totalUpper" + playerId
  ).textContent = !isNaN(bonusTop) ? bonusTop + totalTop : totalTop);

  let totalLower = 0;
  let chanceElement = parseInt(
    document.getElementById("chance" + playerId).textContent
  );
  let yahtzeeElement = parseInt(
    document.getElementById("yahtzee" + playerId).textContent
  );
  let fourOfKindElement = parseInt(
    document.getElementById("fourOfKind" + playerId).textContent
  );
  let threeOfKindElement = parseInt(
    document.getElementById("threeOfKind" + playerId).textContent
  );
  let fullHouseElement = parseInt(
    document.getElementById("fullHouse" + playerId).textContent
  );
  let smallStraightElement = parseInt(
    document.getElementById("smallStraight" + playerId).textContent
  );
  let largeStraightElement = parseInt(
    document.getElementById("largeStraight" + playerId).textContent
  );
  if (!isNaN(chanceElement)) {
    totalLower += chanceElement;
  }
  if (!isNaN(yahtzeeElement)) {
    totalLower += yahtzeeElement;
  }
  if (!isNaN(fourOfKindElement)) {
    totalLower += fourOfKindElement;
  }
  if (!isNaN(threeOfKindElement)) {
    totalLower += threeOfKindElement;
  }
  if (!isNaN(fullHouseElement)) {
    totalLower += fullHouseElement;
  }
  if (!isNaN(smallStraightElement)) {
    totalLower += smallStraightElement;
  }
  if (!isNaN(largeStraightElement)) {
    totalLower += largeStraightElement;
  }
  document.getElementById("totalLower" + playerId).textContent = totalLower;
  document.getElementById("copyTotalUpper" + playerId).textContent = totalTop;
  document.getElementById("total" + playerId).textContent =
    totalLower + totalTop;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 1. adds an click event listener with the function changeLock() to all lock-container children
 */
for (i = 0; i < 5; i++) {
  let tempImg =
    document.getElementsByClassName("lock-container")[0].children[i];
  tempImg.addEventListener("click", changeLock);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * adds an click event to the button with the id 'create-player', which triggers the buttonDiceRoller() function
 */
document.getElementById("create-player").addEventListener("click", newPlayer);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function testCPUplayer() {
  let playerName = "CPU";
  playerId = "CPU";

  createTableRow(playerName);
  console.log("playerArray " + playerArray);
  playerName = "Player 1";
  playerId = "Player1";
  playerArray[0] = "CPU";
  playerArray[1] = "Player1";
  console.log("playerArray 2 " + playerArray);
  createTableRow(playerName);
  document.getElementById("button-Player1").setAttribute("disabled", "");
}

document
  .getElementById("test-cpu-player")
  .addEventListener("click", testCPUplayer);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * CPU player
 */
function cpuPlayer() {
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

  // check yahtzee categories ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * 1. checks if the dices qualify for yahtzee
   * @returns 'true' if it is yahtzee otherwise 'false'
   */
  function isYahtzee() {
    for (i = 1; i <= 6; i++) {
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
    for (i = 1; i <= 6; i++) {
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
  /**
   * 1. 1. checks if the dices qualify for full-house
   * @returns 'true' if it is full-house otherwise 'false'
   */
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
    for (i = 1; i <= 6; i++) {
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
    for (i = 1; i <= 6; i++) {
      let tempNumber = array.filter((point) => point === i);
      if (tempNumber.length === 2) {
        array.splice(array.indexOf(i), 1);
        for (b = 1; i <= 6; b++) {
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

  function yahtzeeCategoryCheck() {
    // has yahtzee open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    if (ableYahtzee) {
      if (isYahtzee()) {
        writeScoreEndTurn("yahtzee");
      }
      // has largeStraight open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableLargeStraight) {
      if (isLargeStraight()) {
        writeScoreEndTurn("largeStraight");
      }
      // has smallStraight open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableSmallStraight) {
      if (isSmallStraight()) {
        writeScoreEndTurn("smallStraight");
      }
      // has fullHouse open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableFullHouse) {
      if (isFullHouse()) {
        writeScoreEndTurn("fullHouse");
      }
      // has sixes open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableSixes) {
      if (isSixes()) {
        writeScoreEndTurn("sixes");
      }
      // has fives open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableFives) {
      if (isFives()) {
        writeScoreEndTurn("fives");
      }
      // has fours open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableFours) {
      if (isFours()) {
        writeScoreEndTurn("fours");
      }
      // has fourOfKind open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableFourOfKind) {
      if (isFourOfKind()) {
        writeScoreEndTurn("fourOfKind");
      }
      // has threeOfKind open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableThreeOfKind) {
      if (isThreeOfKind()) {
        writeScoreEndTurn("threeOfKind");
      }
      // has threes open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableThrees) {
      if (isThrees()) {
        writeScoreEndTurn("threes");
      }
      // has twos open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableTwos) {
      if (isTwos()) {
        writeScoreEndTurn("twos");
      }
      // has aces open ? //////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (ableAces) {
      if (isAces()) {
        writeScoreEndTurn("aces");
      }
      // has chance open ? //////////////////////////////////////////////////////////////////////////////////////////////////
      // } else if (ableChance) {
      //   if (isChance()) {
      //     writeScoreEndTurn("chance");
      //   }
    }
  }

  function whatDiceRoll() {}
}
