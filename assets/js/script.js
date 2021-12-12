/* many thanks to Lena Stanley from https://lenadesign.org/2020/06/18/roll-the-dice/ ,
the dices and the animation is based on here code!
There are two problems in the base code you need to:
1. add to css (the sides of the dice are not attached when animation runs):
   html {font-size: 62.5%;} // add
2. remove from JavaScript (the function rollDice() is called endless and is only stopped through the browser):
   setTimeout(rollDice(), 1000); // remove
*/


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
        // console.log('dice1' + ' true');
        let result_dice1 = diceRoller('dice1');
    }
    if (dice2 === 'true') {
        // console.log('dice2' + ' true');
        let result_dice2 = diceRoller('dice2');
    }
    if (dice3 === 'true') {
        // console.log('dice3' + ' true');
        let result_dice3 = diceRoller('dice3');
    }
    if (dice4 === 'true') {
        // console.log('dice4' + ' true');
        let result_dice4 = diceRoller('dice4');
    }
    if (dice5 === 'true') {
        // console.log('dice5' + ' true');
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
 * adds an click event to the button with the class 'bt-roll-all', which triggers the buttonDiceRoller() function
 */
document.getElementById('bt-roll-all').addEventListener('click', buttonDiceRoller);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////