import { tabularDataSlider } from './modules/tabular-data-slider.js'
import { authorization } from './admin/authorization.js'
import { addPreloader } from './modules/preloader.js'
import { DataJSON } from './modules/data-json.js'
import { getCookie } from './admin/cookie.js'
import { catalog } from './admin/catalog.js'

;(async function() {
  const site = window.location
  const cookie = getCookie()

  addPreloader()

  if (site.pathname.includes('table.html')) {
    if (!cookie) return site.replace(site.toString().replace('/table.html', ''))

    tabularDataSlider()

    await customElements.whenDefined('tds-box')

    // подключение сервиса данных
    document.taskDemo = 0
    document.dataCatalog = new DataJSON({
      url: 'http://localhost:4545/items',
      urlDemo: '../db-demo/items.json',
      errorMessageResponse: 'Сервер базы данных недоступен. Действие отменено.'
    })

    return catalog()
  }

  if (cookie) return site.replace(site.toString().replace(/[^\/]*$/, '') + 'table.html')

  // подключение сервиса данных
  document.dataAdmin = new DataJSON({
    url: 'http://localhost:4545/users',
    urlDemo: '../db-demo/users.json',
    errorMessageResponse: 'Сервер регистрации недоступен. Аутентификация невозможна.'
  })

  // авторизация, параметры: количествоДнейХраненияКуки
  authorization(30)

})()
