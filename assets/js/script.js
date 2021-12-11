/* many thanks to Lena Stanley from https://lenadesign.org/2020/06/18/roll-the-dice/ ,
the dices and the animation is based on here code!
There are two problems in the base code you need to:
1. add to css (the sides of the dice are not attached when animation runs):
   html {font-size: 62.5%;} // add
2. remove from JavaScript (the function rollDice() is called endless and is only stopped through the browser):
   setTimeout(rollDice(), 1000); // remove
*/

/**
 * Note: To generate a random number of the dice dots we need to use Math.floor(Math.random() * 6) + 1;
 * If Math.random() were to roll 0.9, we take that and multiply it by 6 which gives us 5.4.
 * Then we take the floor of that which is 5. Then we add 1 which gives us a final result of 6.
 * So the random numbers will only be between 1 and 6.
 */
let elDiceOne = document.getElementById('dice1');
let elDiceTwo = document.getElementById('dice2');
//  #roll on button
let elComeOut = document.getElementById('roll');

//  attaches dice roll function to button, triggert through click event
elComeOut.onclick = function () {
    rollDice();
};

function rollDice() {

    let diceOne = Math.floor((Math.random() * 6) + 1);
    let diceTwo = Math.floor((Math.random() * 6) + 1);

    console.log(diceOne + ' ' + diceTwo);

    for (let i = 1; i <= 6; i++) {
        elDiceOne.classList.remove('show-' + i);
        if (diceOne === i) {
            elDiceOne.classList.add('show-' + i);
        }
    }

    for (let k = 1; k <= 6; k++) {
        elDiceTwo.classList.remove('show-' + k);
        if (diceTwo === k) {
            elDiceTwo.classList.add('show-' + k);
        }
    }
    setTimeout(rollDice(), 1000);
}

///////////////////////////////////////////////////////////////////////////


//  #roll on button
let zButton = document.getElementById('rollZ');

//  attaches dice roll function to button, triggert through click event
zButton.onclick = function () {
    diceRoller('dice3');
};

function diceRoller(diceId) {
    let dice = document.getElementById(diceId);
    let randomDiceNumber = Math.floor((Math.random() * 6) + 1);

    for (let i = 1; i <= 6; i++) {
        dice.classList.remove('show-' + i);
        if (randomDiceNumber === i) {
            dice.classList.add('show-' + i);
        }
    }

}