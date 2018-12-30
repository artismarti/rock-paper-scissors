const playersURL = `http://localhost:3000/players/`
const leaderBoardDiv = document.getElementById('leaderboard')
const playerListUl = document.getElementById('playerlist')
let playerLabels = []
let playerTotalScores = []
// fetch Players
const fetchPlayers = () => {
  fetch(playersURL)
    .then(response => response.json())
    .then((players) => renderLeaderBoardChart(players))
}

// // renderSinglePlayer
// const renderSinglePlayer = (player) => {
//   let playerLI = document.createElement('li')
//   playerLI.innerHTML = `
//   <h2>${player.username}</h2>
//   <p>Final Score: ${calculateTotalScore(player)}</p>
//   `
// }

const calculateTotalScore = (player) => {
  let totalScore = 0
  player.games.forEach((game) => {
    totalScore += game.game_score
  })
  return totalScore
}

fetchPlayers()

const renderLeaderBoardChart = (players) => {
  players.all_players_games.forEach((player) => {
    // renderSinglePlayer(player)
    playerLabels.push(player.username)
    playerTotalScores.push(calculateTotalScore(player))
  })
  const ctx = document.getElementById('myChart').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: playerLabels,
      datasets: [{
        label: 'Points Scored',
        data: playerTotalScores,
        backgroundColor: function (context) {
          let index = context.dataIndex
          let value = context.dataset.data[index]
          (value < 0) ? 'red' : 'green' // draw negative values in red
        }
      }]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#556F7B',
              fontFamily: 'Roboto Mono'
            },
            gridLines: {
              zeroLineColor: 'transparent',
              drawTicks: false,
              display: false,
              drawBorder: true
            }
          }],
        xAxes: [
          {
            ticks: {
              fontColor: '#556F7B',
              fontFamily: 'Roboto Mono'
            },
            gridLines: {
              zeroLineColor: 'transparent',
              drawTicks: true,
              display: true,
              drawBorder: true
            }
          }
        ]
      }
    }
  })
}
