const rockBtn = document.getElementById('rock')
const paperBtn = document.getElementById('paper')
const scissorsBtn = document.getElementById('scissors')
const playerChoiceDiv = document.getElementById('player-choice')
const computerChoiceDiv = document.getElementById('computer-choice')
const winner = document.getElementById('winner')

const computerChoice = () => {
  let randomNumber = Math.floor((Math.random() * 3) + 1)
  if (randomNumber === 1) {
    return 'rock'
  } else if (randomNumber === 2) {
    return 'paper'
  } else {
    return 'scissors'
  }
}

const chooseWinner = (userChoice) => {
  let computerChoiceValue = computerChoice()
  playerChoiceDiv.innerHTML = `
    <h3>You have chosen: <span class='choice'>${userChoice}</span></h3>
  `
  computerChoiceDiv.innerHTML = `
    <h3>The Computer has chosen: <span class='choice'>${computerChoiceValue}</span></h3>
  `
  let drawResultText = `<h1>It's a draw! Play again...</h1>`
  let computerVictoryText = `<h1>Computer Wins!</h1>`
  let userVictoryText = `<h1>You Win!</h1>`

  if (userChoice === 'rock' && computerChoiceValue === 'rock') {
    winner.innerHTML = drawResultText
  } else if (userChoice === 'rock' && computerChoiceValue === 'paper') {
    winner.innerHTML = computerVictoryText
  } else if (userChoice === 'rock' && computerChoiceValue === 'scissors') {
    winner.innerHTML = userVictoryText
  } else if (userChoice === 'paper' && computerChoiceValue === 'rock') {
    winner.innerHTML = userVictoryText
  } else if (userChoice === 'paper' && computerChoiceValue === 'paper') {
    winner.innerHTML = drawResultText
  } else if (userChoice === 'paper' && computerChoiceValue === 'scissors') {
    winner.innerHTML = computerVictoryText
  } else if (userChoice === 'scissors' && computerChoiceValue === 'rock') {
    winner.innerHTML = computerVictoryText
  } else if (userChoice === 'scissors' && computerChoiceValue === 'paper') {
    winner.innerHTML = userVictoryText
  } else if (userChoice === 'scissors' && computerChoiceValue === 'scissors') {
    winner.innerHTML = drawResultText
  }
}
rockBtn.addEventListener('click', () => chooseWinner('rock'))
paperBtn.addEventListener('click', () => chooseWinner('paper'))
scissorsBtn.addEventListener('click', () => chooseWinner('scissors'))
