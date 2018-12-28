const playersURL = `http://127.0.0.1:3000/players/`

// fetch Players
const fetchPlayers = () => {
  fetch(playersURL)
    .then(response => response.json())
    .then((players) => renderAllPlayers(players))
}

// renderAllPlayers
const renderAllPlayers = (players) => {
  players.forEach((player) => {
    renderSinglePlayer(player)
  })
}

// renderSinglePlayer
const renderSinglePlayer = (player) => {
  //  create a leaderboard section
  //  maybe on index or maybe a separate leaderboard html file
}

const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})
