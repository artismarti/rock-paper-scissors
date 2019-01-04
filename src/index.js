var playerUrl = `http://localhost:3000/players`
const playerUserName = document.getElementById('username')
const playButton = document.getElementById('play')
const welcomeDiv = document.getElementById('welcome-container')
const gameDiv = document.getElementById('game-container')
const leaderBoardDiv = document.getElementById('leaderboard-container')
const leadButton = document.getElementById('viewlb')
const lbLink = document.getElementById('leaderboardLink')
let currentPlayer = document.getElementById('currentPlayer')
let logOutLink = document.getElementById('logout')
let psTableBody = document.getElementById('ps-table-body')
let playerData
gameDiv.style.display = 'none'
leaderBoardDiv.style.display = 'none'
logOutLink.style.display = 'none'

const savePlayer = () => {
  return fetch(playerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username: playerUserName.value
    })
  })
    .then(response => response.json())
}

const fetchPlayer = () => {
  let parsedLocalStoragePlayer = JSON.parse(window.localStorage.getItem('player')).id
  fetch(`${playerUrl}/${parsedLocalStoragePlayer}`)
    .then(response => response.json())
    .then(games => renderPlayerStats(games))
}

// renderSinglePlayerStats
const renderPlayerStats = (games) => {
  psTableBody.innerHTML = ''
  let playerRow = psTableBody.insertRow(-1)
  let winsCell = playerRow.insertCell(0)
  let lossesCell = playerRow.insertCell(1)
  let drawsCell = playerRow.insertCell(2)
  let totalCell = playerRow.insertCell(3)
  if (games.wins === 0 && games.losses === 0 && games.draws === 0 && games.total_score === 0) {
    winsCell.innerHTML = 0
    lossesCell.innerHTML = 0
    drawsCell.innerHTML = 0
    totalCell.innerHTML = 0
  } else {
    winsCell.innerHTML = games.wins
    lossesCell.innerHTML = games.losses
    drawsCell.innerHTML = games.draws
    totalCell.innerHTML = games.total_score
  }
}


playButton.addEventListener('click', () => {
  savePlayer()
    .then((player) => {
      playerData = player
      window.localStorage.setItem('player', JSON.stringify(player));
      currentPlayer.innerText = playerData.username
      logOutLink.style.display = 'inline'
      fetchPlayer()
    })
  welcomeDiv.style.display = 'none'
  gameDiv.style.display = ''
})

leadButton.addEventListener('click', () => {
  welcomeDiv.style.display = 'none'
  leaderBoardDiv.style.display = ''
  gameDiv.style.display = 'none'
})

lbLink.addEventListener('click', () => {
  welcomeDiv.style.display = 'none'
  leaderBoardDiv.style.display = ''
  gameDiv.style.display = 'none'
})
gameDiv.addEventListener('click', () => {
  welcomeDiv.style.display = 'none'
  gameDiv.style.display = ''
  leaderBoardDiv.style.display = 'none'
})

logOutLink.addEventListener('click', () => {
  logOutLink.style.display = 'none'
  currentPlayer.style.display = 'none'
  window.localStorage.clear()
  welcomePlayerDiv.style.display = 'block'
  gameDiv.style.display = 'none'
  leaderBoardDiv.style.display = 'none'
})
