/* Админ-панель. Авторизация через куки */

// создание/удаление (при dayAge=0) куки
export const setCookie = (name, dayAge = 0) => {
  document.cookie = `admin=${name.trim()}; path='/'` + (dayAge ? `; max-age=${dayAge * 3600 * 24}` : '')
}

// чтение куки
export const getCookie = () => {
  const matches = document.cookie.match(/(?:^|; )admin=([^;]*)/)
  return (!matches || matches[1] === 'deleted') ? undefined : matches[1]
}

// удаление куки
export const delCookie = () => {
  setCookie('deleted', 0)
}
