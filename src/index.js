import { ModalList } from './landing/modal-list.js'
import { DataJSON } from './modules/data-json.js'
import { SendForm, inputForm } from './landing/forms.js'
import { tabularDataSlider } from './modules/tabular-data-slider.js'
import { secondPhoneNumber } from './landing/second-phone-number.js'
import { formula } from './landing/formula.js'
import { repairTypes } from './landing/repair-types.js'
import { catalog } from './landing/catalog.js'
import { portfolioSlider } from './landing/portfolio.js'
import { reviewsSlider } from './landing/reviews-slider.js'
import { transparency } from './landing/transparency.js'
import { accordeon } from './landing/accordeon.js'
import { addPreloader } from './modules/preloader.js'
import { menu } from './landing/menu.js'

;(async function() {

  tabularDataSlider()

  await customElements.whenDefined('tds-box')

  menu()

  // подключение сервиса открытия/закрытия модальных блоков
  document.modalList = new ModalList('popup', 'active-popup')

  addPreloader()
  secondPhoneNumber()
  inputForm()

  // подключение сервиса отправки форм
  // параметры: сервер отправки, дополнительные данные к отправке
  document.sendForm = new SendForm({
    url: 'https://jsonplaceholder.typicode.com/posts',

    optionals: {
      // Получите консультацию от специалиста в удобное для Вас время (тел)
      feedback1: [{ name: 'form', assign: 'feedback1' }],
      // Обсудите проект со специалистом или вызовите замерщика (имя,тел)
      feedback2: [{ name: 'form', assign: 'feedback2' }],
      // Получите консультацию от специалиста в удобное для Вас время (тел)
      feedback3: [{ name: 'form', assign: 'feedback3' }],
      // Обсудите проект со специалистом или вызовите замерщика (имя,тел)
      feedback4: [{ name: 'form', assign: 'feedback4' }],
      // Обсудите проект со специалистом или вызовите замерщика (имя,тел)
      feedback5: [{ name: 'form', assign: 'feedback5' }],
      // Получите консультацию от специалиста в удобное для Вас время (тел)
      feedback6: [{ name: 'form', assign: 'feedback6' }]
    }
  })

  formula()
  repairTypes()

  // подключение сервиса данных каталога
  document.taskDemo = 0
  document.dataCatalog = new DataJSON({
    url: 'http://localhost:4545/items',
    urlDemo: './db-demo/items.json',
    errorMessageResponse: 'Сервер базы данных недоступен. Запрос отменен.'
  })

  catalog()
  portfolioSlider()
  reviewsSlider()
  transparency()
  accordeon()

})()
