let mobilenetClassifier
let classifier
let video
let label = 'play'
let classifyButton
const playerChoiceDiv = document.getElementById('player-choice')
const computerChoiceDiv = document.getElementById('computer-choice')
const winner = document.getElementById('winner')
const countDownDiv = document.getElementById('countdown')
const welcomePlayerDiv = document.getElementById('welcome-container')
const timer = document.createElement('p')
timer.style.color = 'red';
timer.style.fontSize = '45px'
timer.style.backgroundColor = '#FFFFFF'
let milliseconds = 0;
countDownDiv.appendChild(timer)
timer.innerText = ''


function modelReady () {
  console.log('Loading Custom Model...')
  classifier.load('./src/model.json ', customModelReady)
}

function customModelReady () {
  console.log('Custom Model is ready.')
  label = 'model ready'
  classifyButton = createButton('PLAY!')
  classifyButton.mousePressed(function () {
    const updatePlayerChoice = () => {
      classifier.classify(showPlayerChoice)
      window.requestAnimationFrame(updatePlayerChoice)
    }
    updatePlayerChoice()
    let counterText = 3
    const startGame = setInterval(() => {
      if (counterText > -1) {
        timer.innerText = counterText
        counterText--
      }
    }, 1000)
    setTimeout(() => {
      window.clearInterval(startGame)
      fetchPlayer()
      classifier.classify(gotResults)
    }, 3000)
  })

}

function videoReady () {
  console.log('Video is ready!!!')
}

function gotResults (error, result) {
  if (error) {
    console.error(error)
  } else {
    label = result
    if (label === 'rock') {
      chooseWinner('1')
    } else if (label === 'paper') {
      chooseWinner('2')
    } else {
      chooseWinner('3')
    }
  }
}
function showPlayerChoice (error, result) {
  if (error) {
    console.error(error)
  } else {
    label = result
  }
}

function setup () {
  createCanvas(320, 270)
  video = createCapture(VIDEO)
  video.hide()
  background(0)
  mobilenetClassifier = ml5.featureExtractor('MobileNet', modelReady)
  mobilenetClassifier.numClasses = 3
  classifier = mobilenetClassifier.classification(video, videoReady)
}
function draw () {
  background(0)
  image(video, 0, 0, 320, 240)
  fill(255)
  textSize(30)
  text(label, 10, height - 20)
}

const computerChoice = () => {
  let randomNumber = Math.floor((Math.random() * 3) + 1)
  return String(randomNumber)
}

const chooseWinner = (userChoice) => {
  let computerChoiceValue = computerChoice()
  let userChoiceText
  let computerChoiceText
  let playerScore
  let drawResultText = `<h1>It's a draw! Play again... 🤺</h1>`
  let computerVictoryText = `<h1>Computer Wins! 🤖</h1>`
  let userVictoryText = `<h1>You Win! 🥇</h1>`
  let rockEmoji = '🤘🏽'
  let paperEmoji = '📜'
  let scissorsEmoji = '✂️'
  let playerMoveEmoji
  let computerMoveEmoji

  if (userChoice === '1' && computerChoiceValue === '1') {
    winner.innerHTML = drawResultText
    userChoiceText = 'rock'
    playerMoveEmoji = rockEmoji
    computerChoiceText = 'rock'
    computerMoveEmoji = rockEmoji
    playerScore = 0
  } else if (userChoice === '1' && computerChoiceValue === '2') {
    winner.innerHTML = computerVictoryText
    userChoiceText = 'rock'
    playerMoveEmoji = rockEmoji
    computerChoiceText = 'paper'
    computerMoveEmoji = paperEmoji
    playerScore = -1
  } else if (userChoice === '1' && computerChoiceValue === '3') {
    winner.innerHTML = userVictoryText
    userChoiceText = 'rock'
    playerMoveEmoji = rockEmoji
    computerChoiceText = 'scissors'
    computerMoveEmoji = scissorsEmoji
    playerScore = 1
  } else if (userChoice === '2' && computerChoiceValue === '1') {
    winner.innerHTML = userVictoryText
    userChoiceText = 'paper'
    playerMoveEmoji = paperEmoji
    computerChoiceText = 'rock'
    computerMoveEmoji = rockEmoji
    playerScore = 1
  } else if (userChoice === '2' && computerChoiceValue === '2') {
    winner.innerHTML = drawResultText
    userChoiceText = 'paper'
    playerMoveEmoji = paperEmoji
    computerChoiceText = 'paper'
    computerMoveEmoji = paperEmoji
    playerScore = 0
  } else if (userChoice === '2' && computerChoiceValue === '3') {
    winner.innerHTML = computerVictoryText
    userChoiceText = 'paper'
    playerMoveEmoji = paperEmoji
    computerChoiceText = 'scissors'
    computerMoveEmoji = scissorsEmoji
    playerScore = -1
  } else if (userChoice === '3' && computerChoiceValue === '1') {
    winner.innerHTML = computerVictoryText
    userChoiceText = 'scissors'
    playerMoveEmoji = scissorsEmoji
    computerChoiceText = 'rock'
    computerMoveEmoji = rockEmoji
    playerScore = -1
  } else if (userChoice === '3' && computerChoiceValue === '2') {
    winner.innerHTML = userVictoryText
    userChoiceText = 'scissors'
    playerMoveEmoji = scissorsEmoji
    computerChoiceText = 'paper'
    computerMoveEmoji = paperEmoji
    playerScore = 1
  } else if (userChoice === '3' && computerChoiceValue === '3') {
    winner.innerHTML = drawResultText
    userChoiceText = 'scissors'
    playerMoveEmoji = scissorsEmoji
    computerChoiceText = 'scissors'
    computerMoveEmoji = scissorsEmoji
    playerScore = 0
  }
  playerChoiceDiv.innerHTML = `
    <h3>You have chosen: <span class='choice'>${userChoiceText}</span> ${playerMoveEmoji}</h3>
  `
  computerChoiceDiv.innerHTML = `
    <h3>The Computer has chosen: <span class='choice'>${computerChoiceText}</span> ${computerMoveEmoji}</h3>
  `
  saveResults(userChoice, computerChoiceValue, playerScore)
}

const saveResults = (userChoice, computerChoiceValue, playerScore) => {
  fetch(`${playerUrl}/${playerData.id}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      computer_move: computerChoiceValue,
      player_move: userChoice,
      game_score: playerScore
    })
  })
    .then(response => response.json())
}
