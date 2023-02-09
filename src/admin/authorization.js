/* Админ-панель. Авторизация */

import { setCookie } from './cookie.js'

export const authorization = (dayAgeCookie = 30) => {
  const forma = document.querySelector('form')
  const name = forma.querySelector('#name')
  const password = forma.querySelector('#type')
  const btnSubmit = forma.querySelector('.button-ui_firm')
  const remember = forma.querySelector('.remember')

  // устанавка предупреждение об ошибке
  const warning = (succesName, succesPassword) => {
    name.nextElementSibling.style.display = succesName ? '' : 'initial'
    if (!succesName) name.value = ''

    password.nextElementSibling.style.display = succesPassword ? '' : 'initial'
    if (!succesPassword) password.value = '';
  }

  // аутентификация админа
  const authentication = () => {
    document.dataAdmin.use()
      .then(users => {
        const user = users.find(user => user.login === name.value)

        warning(user, !user || user.password === password.value)

        if (user && user.password === password.value) {
          const site = window.location

          setCookie(name.value, remember.checked ? dayAgeCookie : 0)
          site.replace(site.toString().replace(/[^\/]*$/, '') + 'table.html')
        }
      })
  }

  // запрет на обычный ввод формы
  forma.addEventListener('submit', e => e.preventDefault())

  // контроль ввода только допустимых символов (имя - без пробелов)
  forma.addEventListener('input', ({ target }) => {
    if (target.matches('.input')) {
      if (target.id === 'name') {
        target.value = target.value.replace(/\s+/gi, '')
      }

      target.nextElementSibling.style.display = ''
    }
  })

  // вход по клику мышкой на кнопочку входа
  btnSubmit.addEventListener('click', () => {
    if (name.value) {
      authentication()
    } else {
      warning(name.value, true)
    }
  })
}
