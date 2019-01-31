let lbPlayerUrl = `http://localhost:3000/players`
let lbTable = document.getElementById('lb-table')
let lbTableBody = document.getElementById('lb-table-body')
// fetch Players
const fetchPlayers = () => {
  fetch(lbPlayerUrl)
    .then(response => response.json())
    .then((players) => renderLeaderBoardChart(players))
}
fetchPlayers()

const renderLeaderBoardChart = (players) => {
  lbTableBody.innerHTML = ''
  players.forEach((player) => {
    let playerRow = lbTableBody.insertRow(-1)
    let playerCell = playerRow.insertCell(0)
    let winsCell = playerRow.insertCell(1)
    let lossesCell = playerRow.insertCell(2)
    let drawsCell = playerRow.insertCell(3)
    let totalCell = playerRow.insertCell(4)
    playerCell.innerHTML = player.player
    winsCell.innerHTML = player.wins
    lossesCell.innerHTML = player.losses
    drawsCell.innerHTML = player.draws
    totalCell.innerHTML = player.total_score
  })
  sortTable()
}
function sortTable() {
  let rows, switching, i, x, y, shouldSwitch;
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = lbTable.rows;
    /*Loop through all lbTable rows (except the
    first, which contains lbTable headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName('TD')[4];
      y = rows[i + 1].getElementsByTagName('td')[4];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }

  }
  rows[1].getElementsByTagName('TD')[0].innerHTML += ' 👑 👑 👑'
  rows[2].getElementsByTagName('TD')[0].innerHTML += ' 👑 👑'
  rows[3].getElementsByTagName('TD')[0].innerHTML += ' 👑'

}
