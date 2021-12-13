/* many thanks to Lena Stanley from https://lenadesign.org/2020/06/18/roll-the-dice/ ,
the dices and the animation is based on here code!
There are two problems in the base code you need to:
1. add to css (the sides of the dice are not attached when animation runs):
html {font-size: 62.5%;} // add
2. remove from JavaScript (the function rollDice() is called endless and is only stopped through the browser):
setTimeout(rollDice(), 1000); // remove
Update: the code is based now on CHRIS GODBER  https://icodemag.com/3d-rolling-dice-css-javascript/ and the design on Lena Stanleys dice
*/

let turnCount = null; // counts how many turns the player has played, max 3, see playTurn()
let turnScore = []; //the dice score after ever turn
let playerArray = []; // contains the players of the game


/**
 * dice animation and random number generator (needs to be called for each dice individual),
 * parameter needs to be the html dice id (e.g. 'dice1')
 * @param {*} diceId 
 */
function diceRoller(diceId) {
    let dice = document.getElementById(diceId);
    let randomDiceNumber = Math.floor((Math.random() * 6) + 1);
    let showClass = 'show-' + randomDiceNumber;

    // if there is a class already selected remove it (6 possible classes)
    for (i = 1; i <= 6; i++) {
        dice.classList.remove('show-' + i);
    }

    // add the new showclass with the generated number
    // (will be displayed in the browser as the diced number)
    dice.classList.add(showClass);
    return randomDiceNumber;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * rolls only the dices with the attribute data-lock-open === 'true'
 * 
 */
function buttonDiceRoller(playerId) {
    let dice1 = document.getElementById('dice1').getAttribute('data-lock-open');
    let dice2 = document.getElementById('dice2').getAttribute('data-lock-open');
    let dice3 = document.getElementById('dice3').getAttribute('data-lock-open');
    let dice4 = document.getElementById('dice4').getAttribute('data-lock-open');
    let dice5 = document.getElementById('dice5').getAttribute('data-lock-open');

    if (dice1 === 'true') {
        diceRoller('dice1');
    }
    if (dice2 === 'true') {
        diceRoller('dice2');
    }
    if (dice3 === 'true') {
        diceRoller('dice3');
    }
    if (dice4 === 'true') {
        diceRoller('dice4');
    }
    if (dice5 === 'true') {
        diceRoller('dice5');
    }

    writeScoreTable(playerId);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * changes the lock image (icon) locked / unlocked,
 * sets the data-lock-open attribute on the dice id to false or true
 */
function changeLock() {
    let unlocked64 = 'assets/images/icons/unlocked-64.png';
    let locked64 = 'assets/images/icons/locked-64.png';
    let unlocked128 = 'assets/images/icons/unlocked-128.png';
    let locked128 = 'assets/images/icons/locked-128.png';
    let currentPosition = this.getAttribute("src");

    if (currentPosition === unlocked64) {
        this.setAttribute('src', locked64);
        if (this.matches('#lock-1')) {
            document.getElementById('dice1').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-2')) {
            document.getElementById('dice2').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-3')) {
            document.getElementById('dice3').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-4')) {
            document.getElementById('dice4').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-5')) {
            document.getElementById('dice5').setAttribute('data-lock-open', 'false');
        }
    } else if (currentPosition === locked64) {
        this.setAttribute('src', unlocked64);
        if (this.matches('#lock-1')) {
            document.getElementById('dice1').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-2')) {
            document.getElementById('dice2').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-3')) {
            document.getElementById('dice3').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-4')) {
            document.getElementById('dice4').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-5')) {
            document.getElementById('dice5').setAttribute('data-lock-open', 'true');
        }
    } else if (currentPosition === unlocked128) {
        this.setAttribute('src', locked128);
        if (this.matches('#lock-1')) {
            document.getElementById('dice1').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-2')) {
            document.getElementById('dice2').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-3')) {
            document.getElementById('dice3').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-4')) {
            document.getElementById('dice4').setAttribute('data-lock-open', 'false');
        } else if (this.matches('#lock-5')) {
            document.getElementById('dice5').setAttribute('data-lock-open', 'false');
        }
    } else if (currentPosition === locked128) {
        this.setAttribute('src', unlocked128);
        if (this.matches('#lock-1')) {
            document.getElementById('dice1').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-2')) {
            document.getElementById('dice2').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-3')) {
            document.getElementById('dice3').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-4')) {
            document.getElementById('dice4').setAttribute('data-lock-open', 'true');
        } else if (this.matches('#lock-5')) {
            document.getElementById('dice5').setAttribute('data-lock-open', 'true');
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * function is called when dice button is pressed to handle events
 * creates array from dice numbers
 */
function playTurn(playerId) {
    // disable dice button after 3 turns
    turnCount++;
    if (turnCount === 3) {
        document.getElementById('button-' + playerId).setAttribute('disabled', '')
    }

    buttonDiceRoller(playerId);

    // gets the dice result from the dice id (e.g. dice1) and checks which 'show-'+? class it has,
    // the number of the show class (show-1 == dice shows 1) is the dice number which is saved into the 'turnScore' array
    for (i = 1; i <= 5; i++) {
        let dicePosition = document.getElementById('dice' + i).classList;
        for (z = 1; z <= 6; z++) {
            if (dicePosition.contains('show-' + z)) {
                turnScore[i - 1] = z;
            }
        }
    }
    writeScoreTable(playerId);

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * creates a new player in the score table
 */
function newPlayer() {

    let promptMessage = 'Please enter your name ';
    let playerName;
    let playerId;

    for (i = 1; i < 10; i++) {
        playerName = prompt(`${promptMessage}`, `Player ${i}`);
        playerId = playerName.replace(/\s/g, ''); //remove space from player string to be used as id
        if (!playerArray.includes(playerId)) {
            playerArray.push(playerId);
            break;
        }
        promptMessage = 'The name ';
        for (b = 0; b < playerArray.length; b++) {
            promptMessage += `"${playerArray[b]}" `;
        }
        promptMessage += 'is already taken! Please choose a different name';
    }

    // let playerName = prompt("Please enter your name", "Harry Potter");
    // let playerName = '  Player 1 '; // need to add validation, no special character, length
    // let playerId = playerName.replace(/\s/g, ''); //remove space from player string to be used as id
    let tableDataUpper = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'totalTop', 'bonusTop', 'totalUpper'];
    let tableUpper = document.getElementById('table-upper');
    let tableDataLower = ['threeOfKind', 'fourOfKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance', 'totalLower', 'copyTotalUpper', 'total'];
    let tableLower = document.getElementById('table-lower');

    let tableHead = document.createElement("th");
    tableHead.textContent = 'Player';
    document.getElementById('table-head').appendChild(tableHead);

    let tablePlayerName = document.createElement("th");
    tablePlayerName.textContent = playerName;
    document.getElementById('table-player-name').appendChild(tablePlayerName);

    for (i = 0; i < tableDataUpper.length; i++) {
        let tempTableElement = document.createElement("th");
        if ((tableDataUpper[i] === 'totalTop') || (tableDataUpper[i] === 'bonusTop') || (tableDataUpper[i] === 'totalUpper')) {
            tempTableElement.textContent = '---';
            tempTableElement.setAttribute('id', tableDataUpper[i] + playerId);
        } else {
            let tempButton = document.createElement("button");
            tempButton.classList.add('table-button');
            // tempButton.textContent = tableDataUpper[i];
            tempButton.textContent = '---';
            tempButton.setAttribute('id', tableDataUpper[i] + playerId);
            tempTableElement.appendChild(tempButton);
        }
        tableUpper.children[i].appendChild(tempTableElement);
    }

    for (i = 0; i < tableDataLower.length; i++) {
        let tempTableElement = document.createElement("th");
        if ((tableDataLower[i] === 'totalLower') || (tableDataLower[i] === 'copyTotalUpper') || (tableDataLower[i] === 'total')) {
            tempTableElement.textContent = '---';
            tempTableElement.setAttribute('id', tableDataLower[i] + playerId);
        } else {
            let tempButton = document.createElement("button");
            tempButton.classList.add('table-button');
            // tempButton.textContent = tableDataLower[i];
            tempButton.textContent = '---';
            tempButton.setAttribute('id', tableDataLower[i] + playerId);
            tempTableElement.appendChild(tempButton);
        }
        tableLower.children[i].appendChild(tempTableElement);
    }

    let playerPlayButton = document.createElement("button");
    playerPlayButton.textContent = playerName;
    playerPlayButton.setAttribute('id', 'button-' + playerId);
    document.getElementById('button-play-place').appendChild(playerPlayButton);

    document.getElementById('button-' + playerId).addEventListener('click', function () {
        playTurn(playerId);
    });


    // do not include the first player (i===0), disables all new buttons
    for (i = 1; i < playerArray.length; i++) {
        let otherPlayer = playerArray[i];
        document.getElementById('button-' + otherPlayer).setAttribute('disabled', '');
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * analyse score and write points into table 
 */
function writeScoreTable(playerId) {

    // checks which show class is applied to the dice id and saves its value into the turnScore array (=== dice result)
    for (i = 1; i <= 5; i++) {
        let dicePosition = document.getElementById('dice' + i).classList;
        for (z = 1; z <= 6; z++) {
            if (dicePosition.contains('show-' + z)) {
                turnScore[i - 1] = z;
            }
        }
    }

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

    // turnScore = [1, 3, 4, 2, 5];
    console.log(turnScore);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    const addTogether = (previousValue, currentValue) => previousValue + currentValue;

    // find out if there is a chance
    let chanceElement = document.getElementById('chance' + playerId);

    // if no 'disabled', points are writer into table and button flashes
    if (!(chanceElement.hasAttribute('disabled'))) {
        chanceElement.textContent = turnScore.reduce(addTogether);
        chanceElement.classList.add("table-button--flash");
    }

    // find out if there is a yahtzee
    let yahtzeeElement = document.getElementById('yahtzee' + playerId);

    for (i = 1; i <= 6; i++) {
        let tempNumber = turnScore.filter(point => point === i);
        if (tempNumber.length === 5) {
            yahtzee = true;
            if (!(yahtzeeElement.hasAttribute('disabled'))) {
                yahtzeeElement.textContent = 50;
                yahtzeeElement.classList.add("table-button--flash");
            }
            break;
        } else {
            yahtzee = false;
            if (!(yahtzeeElement.hasAttribute('disabled'))) {
                yahtzeeElement.textContent = '---';
                yahtzeeElement.classList.remove("table-button--flash");
            }
        }
    }

    // find out if there is a fourOfKind
    let fourOfKindElement = document.getElementById('fourOfKind' + playerId);

    for (i = 1; i <= 6; i++) {
        let tempNumber = turnScore.filter(point => point === i);
        if (tempNumber.length === 4 || tempNumber.length === 5) {
            fourOfKind = true;
            if (!(fourOfKindElement.hasAttribute('disabled'))) {
                fourOfKindElement.textContent = turnScore.reduce(addTogether);
                fourOfKindElement.classList.add("table-button--flash");
            }
            break;
        } else {
            fourOfKind = false;
            if (!(fourOfKindElement.hasAttribute('disabled'))) {
                fourOfKindElement.textContent = '---';
                fourOfKindElement.classList.remove("table-button--flash");
            }
        }
    }

    // find out if there is a threeOfKind
    let threeOfKindElement = document.getElementById('threeOfKind' + playerId);
    for (i = 1; i <= 6; i++) {
        let tempNumber = turnScore.filter(point => point === i);
        if (tempNumber.length === 3 || tempNumber.length === 4 || tempNumber.length === 5) {
            threeOfKind = true;
            if (!(threeOfKindElement.hasAttribute('disabled'))) {
                threeOfKindElement.textContent = turnScore.reduce(addTogether);
                threeOfKindElement.classList.add("table-button--flash");
            }
            break;
        } else {
            threeOfKind = false;
            if (!(threeOfKindElement.hasAttribute('disabled'))) {
                threeOfKindElement.textContent = '---';
                threeOfKindElement.classList.remove("table-button--flash");
            }
        }
    }

    // find out if there is a fullHouse
    let fullHouseElement = document.getElementById('fullHouse' + playerId);
    let bigArray = [
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (i = 1; i <= 6; i++) {
        let tempNumber = turnScore.filter(point => point === i);
        bigArray[i - 1] = tempNumber;
    }

    breakLoop:
        for (i = 0; i <= 5; i++) {
            let arrayLength = bigArray[i].length;
            if (arrayLength === 3) {
                for (b = 0; b <= 5; b++) {
                    arrayLength = bigArray[b].length;
                    if (arrayLength === 2) {
                        fullHouse = true;
                        if (!(fullHouseElement.hasAttribute('disabled'))) {
                            fullHouseElement.textContent = 25;
                            fullHouseElement.classList.add("table-button--flash");
                        }
                        break breakLoop;
                    } else {
                        fullHouse = false;
                        if (!(fullHouseElement.hasAttribute('disabled'))) {
                            fullHouseElement.textContent = '---';
                            fullHouseElement.classList.remove("table-button--flash");
                        }
                    }
                }
            } else {
                fullHouse = false;
                if (!(fullHouseElement.hasAttribute('disabled'))) {
                    fullHouseElement.textContent = '---';
                    fullHouseElement.classList.remove("table-button--flash");
                }
            }
        }

    // find out if there is a smallStraight
    let smallStraightElement = document.getElementById('smallStraight' + playerId);

    let tempSmallSortAscendant = turnScore;
    let tempSmallSortDescendant = turnScore;

    tempSmallSortAscendant.sort((a, b) => a - b);
    tempSmallSortAscendant = tempSmallSortAscendant.slice(0, 4);
    tempSmallSortAscendant = tempSmallSortAscendant.toString();

    tempSmallSortDescendant.sort((a, b) => b - a);
    tempSmallSortDescendant = tempSmallSortDescendant.slice(0, 4);
    tempSmallSortDescendant = tempSmallSortDescendant.toString();

    if (tempSmallSortAscendant === '1,2,3,4') {
        smallStraight = true;
    } else if (tempSmallSortAscendant === '2,3,4,5') {
        smallStraight = true;
    } else if (tempSmallSortDescendant === '6,5,4,3') {
        smallStraight = true;
    } else {
        smallStraight = false;
    }

    // if no 'disabled', points are writer into table and button flashes
    if (!(smallStraightElement.hasAttribute('disabled'))) {
        if (smallStraight) {
            smallStraightElement.textContent = 30;
            smallStraightElement.classList.add("table-button--flash");
        } else {
            smallStraightElement.textContent = '---';
            smallStraightElement.classList.remove("table-button--flash");
        }
    }

    // find out if there is a largeStraight
    let largeStraightElement = document.getElementById('largeStraight' + playerId);
    let templargeSortAscendant = turnScore;

    templargeSortAscendant.sort((a, b) => a - b);
    templargeSortAscendant = templargeSortAscendant.toString();

    if (templargeSortAscendant === '1,2,3,4,5') {
        largeStraight = true;
    } else if (templargeSortAscendant === '2,3,4,5,6') {
        largeStraight = true;
    } else {
        largeStraight = false;
    }

    // if no 'disabled', points are writer into table and button flashes
    if (!(largeStraightElement.hasAttribute('disabled'))) {
        if (largeStraight) {
            largeStraightElement.textContent = 40;
            largeStraightElement.classList.add("table-button--flash");
        } else {
            largeStraightElement.textContent = '---';
            largeStraightElement.classList.remove("table-button--flash");
        }
    }

    // find out if upper section is true
    let acesElement = document.getElementById('aces' + playerId);
    let twosElement = document.getElementById('twos' + playerId);
    let threesElement = document.getElementById('threes' + playerId);
    let foursElement = document.getElementById('fours' + playerId);
    let fivesElement = document.getElementById('fives' + playerId);
    let sixesElement = document.getElementById('sixes' + playerId);

    let tempUpperArray = [
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (i = 1; i <= 6; i++) {
        tempUpperArray[i - 1] = turnScore.filter(point => point === i);
        if (tempUpperArray[0].length >= 1) {
            aces = true;
            if (!(acesElement.hasAttribute('disabled'))) {
                acesElement.textContent = tempUpperArray[0].length * 1;
                acesElement.classList.add("table-button--flash");
            }
        } else {
            aces = false;
            if (!(acesElement.hasAttribute('disabled'))) {
                acesElement.textContent = '---';
                acesElement.classList.remove("table-button--flash");
            }
        }

        if (tempUpperArray[1].length >= 1) {
            twos = true;
            if (!(twosElement.hasAttribute('disabled'))) {
                twosElement.textContent = tempUpperArray[1].length * 2;
                twosElement.classList.add("table-button--flash");
            }
        } else {
            twos = false;
            if (!(twosElement.hasAttribute('disabled'))) {
                twosElement.textContent = '---';
                twosElement.classList.remove("table-button--flash");
            }
        }

        if (tempUpperArray[2].length >= 1) {
            threes = true;
            if (!(threesElement.hasAttribute('disabled'))) {
                threesElement.textContent = tempUpperArray[2].length * 3;
                threesElement.classList.add("table-button--flash");
            }
        } else {
            threes = false;
            if (!(threesElement.hasAttribute('disabled'))) {
                threesElement.textContent = '---';
                threesElement.classList.remove("table-button--flash");
            }
        }

        if (tempUpperArray[3].length >= 1) {
            fours = true;
            if (!(foursElement.hasAttribute('disabled'))) {
                foursElement.textContent = tempUpperArray[3].length * 4;
                foursElement.classList.add("table-button--flash");
            }
        } else {
            fours = false;
            if (!(foursElement.hasAttribute('disabled'))) {
                foursElement.textContent = '---';
                foursElement.classList.remove("table-button--flash");
            }
        }

        if (tempUpperArray[4].length >= 1) {
            fives = true;
            if (!(fivesElement.hasAttribute('disabled'))) {
                fivesElement.textContent = tempUpperArray[4].length * 5;
                fivesElement.classList.add("table-button--flash");
            }
        } else {
            fives = false;
            if (!(fivesElement.hasAttribute('disabled'))) {
                fivesElement.textContent = '---';
                fivesElement.classList.remove("table-button--flash");
            }
        }

        if (tempUpperArray[5].length >= 1) {
            sixes = true;
            if (!(sixesElement.hasAttribute('disabled'))) {
                sixesElement.textContent = tempUpperArray[5].length * 6;
                sixesElement.classList.add("table-button--flash");
            }
        } else {
            sixes = false;
            if (!(sixesElement.hasAttribute('disabled'))) {
                sixesElement.textContent = '---';
                sixesElement.classList.remove("table-button--flash");
            }
        }

    }
    // console.log('<<< start <<<')
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

    // adds the savePointsTable() to all buttons which have the class of 'table-button--flash'
    let tempTableButtonFlash = document.getElementsByClassName('table-button--flash');
    // console.log(tempTableButtonFlash);
    for (i = 0; i < tempTableButtonFlash.length; i++) {
        tempTableButtonFlash[i].addEventListener('click', function () {
            savePointsTable(this, playerId);
        });
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function savePointsTable(thisButton, playerId) {
    let tempButton = thisButton;
    console.log(tempButton);
    thisButton.setAttribute('disabled', '');
    thisButton.classList.remove('table-button--flash');
    document.getElementById('button-' + playerId).setAttribute('disabled', '')
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * adds an click event listener with the function changeLock() to all lock-container children
 */
for (i = 0; i < 5; i++) {
    let tempImg = document.getElementsByClassName('lock-container')[0].children[i];
    tempImg.addEventListener('click', changeLock);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * adds an click event to the button with the class 'bt-roll-all', which triggers the buttonDiceRoller() function
 */

// document.getElementById('bt-roll-all').addEventListener('click', playTurn);
document.getElementById('create-player').addEventListener('click', newPlayer);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////