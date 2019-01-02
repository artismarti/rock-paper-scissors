const playerUserName = document.getElementById('username')
const playButton = document.getElementById('play')

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
  let user = playerUserName.value
  if (user !== '' && user !== null) {
    setCookie('username', user, 30)
    console.log(document.cookie)
  }
}
const eraseCookie = () => {
  setCookie('username', '', -1);
}

playButton.addEventListener('click', () => {
  console.log('Im in')
  checkCookie()
})
