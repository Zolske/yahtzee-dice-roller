# ![yahtzee-dice](assets/images/logo/logo-dice-50x42.png) Yahtzee Dice Roller

The user can play a game of Yahtzee with a friend on the same machine or against the computer. A tutorial provides instructions on how the game works on this site and the Yahtzee game rules in general.

[link to the "Yahtzee Dice Roller" site](https://zolske.github.io/yahtzee-dice-roller/) _(press **CTRL** while clicking on the link opens a new tab)_

<!-- ![yahtzee-dice-roller mockup](assets/images/doc/readme/yathzee_dice-roller_mockup.webp) -->

---

## Features

### Existing Features:

- **quick and easy game set up**
  <!-- ![game set up](assets/images/doc/readme/game-buttons.webp) -->
  - **"add human player"**
    - add as many players as you like _(to be played **manually** on one machine)_
  - **"add cpu player"**
    - add as many players as you like _(to be played by the **computer**)_
  - **"tutorial"**
    - explains how the game works on this site and the rules of Yahtzee
  - **"restart game"**
    - clears the the "game table" for a new game
- **player name**
  <!-- ![player name](assets/images/doc/readme/player-name.webp) -->
  - individual names can be given to the players
  - JavaScript is checking that the same name can not be used twice
- **"game-logic"**
  <!-- ![button highlighter](assets/images/doc/readme/button-highlighter.gif) -->
  - the possible choices which the play has are highlighted by the "game-logic"  
    _(you can see in the image above, that "Player 1" rolled two twos but no ones. The "game-logic" highlighted 4 points in "twos" but no "ones".)_
  - the player is guided through flashing-buttons (e.g. next player and where he can write points)
- **"cpu player"**
  <!-- ![cpu player](assets/images/doc/readme/robot-pointing.gif) ![cpu is communicating](assets/images/doc/readme/cpu-playing.gif) -->
  - makes decisions which dices to roll and where to write the points
  - communicates with the human player via text and sound
- **see what the computer is doing**
  <!-- ![console cpu player](assets/images/doc/readme/console-cpu.gif) -->
  - with the chrome "dev tool" _(F12)_ the console can be opened in which the "player-object" and some important values are displayed while the cpu is playing
- **intuitive game design**
  <!-- ![lock and unlock lock](assets/images/doc/readme/lock.gif) -->
  - easy to understand symbols make the game accessible to a wide variety of players
- **tutorial**
  - explains how the game works
  - explains the Yahtzee game rules
  - easy to navigate through a navigation bar which sticks to the top of the screen
- **"mobile first" design**
  <!-- ![iphone game view](assets/images/doc/readme/iphone-screenshot.webp) -->
  - can be easily played on a smart phone with a big screen
  - buttons have been given enough spaced to avoid mistakes
  - only up and down scrolling _(only side scrolling if there are more than three players set up)_

### Features Left to Implement:

- adding a setting menu, to customize user profile, dice color, theme
- adding a data base would allow the user to save there profile and high score

---

## Testing

### browser testing:

- functionality- and layout- tests where successful on: _"Chrome"_, _"Mozilla Firefox"_ and _"Microsoft Edge"_
- because the tester has no access to _"Safari"_, the site was not tested on that browser

---

### Validator Testing

- [**Nu Html Checker**](https://validator.w3.org/nu/?doc=https%3A%2F%2Fzolske.github.io%2Fyahtzee-dice-roller%2F) :
  - test returned clean, no errors or warnings

---

## Unfixed Bugs

---

## Deployment

---

## Credits

- the code for the **dice animation** is based on  
  Lena Stanleys [Roll the dice!](https://lenadesign.org/2020/06/18/roll-the-dice/) and  
  CHRIS GODBER [How to Create 3D Rolling Dice with CSS and JavaScript](https://icodemag.com/3d-rolling-dice-css-javascript/)

### Tools

- **the logo** was created with [freelogodesign](https://www.freelogodesign.org/)
- **the favicon** was converted with [favicon](https://favicon.io/favicon-converter/)
- **the wireframe** was done with [figma](https://www.figma.com/)
- **the images** are from ...
  - ... [unsplash](https://unsplash.com/) and
  - ... [pixelbay](https://pixabay.com/)
- **the color palette** was created with [coolors](https://coolors.co/)
- **the gradients** where coded with [cssgradient](https://cssgradient.io/)
- **icons** are from [flaticon](https://www.flaticon.com/)

test image
![can you see 1](assets/images/icons/locked-64.png)
![can you see 2](/assets/images/icons/locked-64.png)
![iphone game view](assets/images/doc/readme/iphone-screenshot.webp)
![console cpu player](assets/images/doc/readme/console-cpu.gif)
