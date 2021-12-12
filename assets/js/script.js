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
let turnScore = [];


/**
 * dice animation and random number generator,
 * parameter needs to be the html dice id (e.g. 'dice1')
 * @param {*} diceId 
 */
function diceRoller(diceId) {
    let dice = document.getElementById(diceId);
    let currentClass = '';
    let randomDiceNumber = Math.floor((Math.random() * 6) + 1);
    let showClass = 'show-' + randomDiceNumber;

    // if there is a class already selected remove it
    for (i = 1; i <= 6; i++) {
        dice.classList.remove('show-' + i);
    }

    // add the new showclass with the generated number
    dice.classList.add(showClass);
    //set the current class to the randomly generated number
    currentClass = showClass;
    return randomDiceNumber;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * rolls only the dices with the attribute data-lock-open === 'true'
 */
function buttonDiceRoller() {
    let dice1 = document.getElementById('dice1').getAttribute('data-lock-open');
    let dice2 = document.getElementById('dice2').getAttribute('data-lock-open');
    let dice3 = document.getElementById('dice3').getAttribute('data-lock-open');
    let dice4 = document.getElementById('dice4').getAttribute('data-lock-open');
    let dice5 = document.getElementById('dice5').getAttribute('data-lock-open');

    if (dice1 === 'true') {
        let result_dice1 = diceRoller('dice1');
    }
    if (dice2 === 'true') {
        let result_dice2 = diceRoller('dice2');
    }
    if (dice3 === 'true') {
        let result_dice3 = diceRoller('dice3');
    }
    if (dice4 === 'true') {
        let result_dice4 = diceRoller('dice4');
    }
    if (dice5 === 'true') {
        let result_dice5 = diceRoller('dice5');
    }
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * adds an click event listener with the function changeLock() to all lock-container children
 */
for (i = 0; i < 5; i++) {
    let tempImg = document.getElementsByClassName('lock-container')[0].children[i];
    tempImg.addEventListener('click', changeLock);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * creates an array fom the score values
 */
// function diceScore() {
//     let scoreDice1 = document.getElementById('dice1');
//     return scoreDice1
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * function is called when dice button is pressed to handle events
 */

function playTurn() {
    turnCount++;
    if (turnCount === 3) {
        document.getElementById('bt-roll-all').setAttribute('disabled', '')
    }
    buttonDiceRoller();

    for (i = 1; i <= 5; i++) {
        let dicePosition = document.getElementById('dice' + i).classList;
        // console.log(dicePosition);
        for (z = 1; z <= 6; z++) {
            if (dicePosition.contains('show-' + z)) {
                console.log('show-' + z)
                turnScore[i - 1] = z;
            }
        }
    }
    console.log(turnScore);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * creates a new player in the score table
 */
function newPlayer() {
    // let playerName = prompt("Please enter your name", "Harry Potter");
    let playerName = '  Player 1 '; // need to add validation, no special character, length
    let playerId = playerName.replace(/\s/g, ''); //remove space from player string to be used as id
    let tableDataUpper = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'totalTop', 'bonusTop', 'totalUpper'];
    let tableUpper = document.getElementById('table-upper');
    let tableDataLower = ['threeOfKind', 'fourOfKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance', 'totalLower', 'copyTotalUpper', 'total'];
    let tableLower = document.getElementById('table-lower');
    // console.log(tableUpper.children[0]);

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
            tempButton.textContent = tableDataUpper[i];
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
            tempButton.textContent = tableDataLower[i];
            tempButton.setAttribute('id', tableDataLower[i] + playerId);
            tempTableElement.appendChild(tempButton);
        }
        tableLower.children[i].appendChild(tempTableElement);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * analyse score and write points into table 
 */
function writeScoreTable() {
    console.log(turnScore);
}

/**
 * adds an click event to the button with the class 'bt-roll-all', which triggers the buttonDiceRoller() function
 */
document.getElementById('bt-roll-all').addEventListener('click', playTurn);
document.getElementById('create-player').addEventListener('click', newPlayer);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////