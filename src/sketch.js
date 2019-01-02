let mobilenet
let classifier
let video
let label = 'play'
let classifyButton
const playerChoiceDiv = document.getElementById('player-choice')
const computerChoiceDiv = document.getElementById('computer-choice')
const winner = document.getElementById('winner')

function modelReady () {
  console.log('--000000--')
  console.log('Model is ready!!!')
  classifier.load('./src/model.json ', customModelReady)
}

function customModelReady () {
  console.log('Custom Model is ready!!!')
  label = 'model ready'
  classifyButton = createButton('classify!')
  classifyButton.mousePressed(function () {
    classifier.classify(gotResults)
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
    setCookie('userMove', label, 30)
    if (label === 'rock'){
      chooseWinner('1')
    } else if (label === 'paper') {
      chooseWinner('2')
    } else {
      chooseWinner('3')
    }
    // classifier.classify(gotResults)
  }
}

function setup () {
  createCanvas(320, 270)
  video = createCapture(VIDEO)
  video.hide()
  background(0)
  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
  classifier = mobilenet.classification(video, videoReady)
}

function draw () {
  background(0)
  image(video, 0, 0, 320, 240)
  fill(255)
  textSize(16)
  text(label, 10, height - 10)
}

const setCookie = (cname, cvalue, exdays) => {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

const getCookie = (cname) => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const checkCookie = () => {
  let userMove = label
  if (userMove !== '' && userMove !== null && userMove !== 'play') {
    setCookie('userMove', userMove, 30)
    console.log(document.cookie)
  }
}
const eraseCookie = () => {
  setCookie('userMove', '', -1);
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
}
