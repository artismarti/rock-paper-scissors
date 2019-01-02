const rockBtn = document.getElementById('1')
const paperBtn = document.getElementById('2')
const scissorsBtn = document.getElementById('3')
const playerChoiceDiv = document.getElementById('player-choice')
const computerChoiceDiv = document.getElementById('computer-choice')
const winner = document.getElementById('winner')
const welcomePlayerDiv = document.getElementById('welcomePlayer')
const playerUrl = `http://localhost:3000/players`
let user = document.cookie.split('=')[1]
welcomePlayerDiv.innerText = 'Welcome ' + user

const savePlayer = () => {
  let user = document.cookie.split('=')[1]
  console.log('SAVING PLAYER RYAN')
  fetch(playerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username: user
    })
  })
    .then(response => response.json())
    .then((player) => {
      console.log(player)
    })
}

// game logic
const computerChoice = () => {
  let randomNumber = Math.floor((Math.random() * 3) + 1)
  return String(randomNumber)
}

const chooseWinner = (userChoice) => {
  let computerChoiceValue = computerChoice()
  let userChoiceText
  let computerChoiceText
  let playerScore
  let drawResultText = `<h1>It's a draw! Play again...</h1>`
  let computerVictoryText = `<h1>Computer Wins!</h1>`
  let userVictoryText = `<h1>You Win!</h1>`

  if (userChoice === '1' && computerChoiceValue === '1') {
    winner.innerHTML = drawResultText
    userChoiceText = 'rock'
    computerChoiceText = 'rock'
    playerScore = 0
  } else if (userChoice === '1' && computerChoiceValue === '2') {
    winner.innerHTML = computerVictoryText
    userChoiceText = 'rock'
    computerChoiceText = 'paper'
    playerScore = -1
  } else if (userChoice === '1' && computerChoiceValue === '3') {
    winner.innerHTML = userVictoryText
    userChoiceText = 'rock'
    computerChoiceText = 'scissors'
    playerScore = 1
  } else if (userChoice === '2' && computerChoiceValue === '1') {
    winner.innerHTML = userVictoryText
    userChoiceText = 'paper'
    computerChoiceText = 'rock'
    playerScore = 1
  } else if (userChoice === '2' && computerChoiceValue === '2') {
    winner.innerHTML = drawResultText
    userChoiceText = 'paper'
    computerChoiceText = 'paper'
    playerScore = 0
  } else if (userChoice === '2' && computerChoiceValue === '3') {
    winner.innerHTML = computerVictoryText
    userChoiceText = 'paper'
    computerChoiceText = 'scissors'
    playerScore = -1
  } else if (userChoice === '3' && computerChoiceValue === '1') {
    winner.innerHTML = computerVictoryText
    userChoiceText = 'scissors'
    computerChoiceText = 'rock'
    playerScore = -1
  } else if (userChoice === '3' && computerChoiceValue === '2') {
    winner.innerHTML = userVictoryText
    userChoiceText = 'scissors'
    computerChoiceText = 'paper'
    playerScore = 1
  } else if (userChoice === '3' && computerChoiceValue === '3') {
    winner.innerHTML = drawResultText
    userChoiceText = 'scissors'
    computerChoiceText = 'scissors'
    playerScore = 0
  }
  playerChoiceDiv.innerHTML = `
    <h3>You have chosen: <span class='choice'>${userChoiceText}</span></h3>
  `
  computerChoiceDiv.innerHTML = `
    <h3>The Computer has chosen: <span class='choice'>${computerChoiceText}</span></h3>
  `
  saveResults(userChoice, computerChoiceValue, playerScore)
}

const saveResults = (userChoice, computerChoiceValue, playerScore) => {
  fetch(playerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      computer_move: computerChoiceValue,
      player_move: userChoice,
      game_score: playerScore,
      player_id: 2
    })
  })
    .then(response => response.json())
}

rockBtn.addEventListener('click', () => chooseWinner('1'))
paperBtn.addEventListener('click', () => chooseWinner('2'))
scissorsBtn.addEventListener('click', () => chooseWinner('3'))
savePlayer()
