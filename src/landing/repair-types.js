/* Лейдинг. Слайдер Видов ремонтов */

import { animate } from '../modules/helpers.js'

export const repairTypes = () => {
  const repairTypes = document.getElementById('repair-types')
  const navSlider = repairTypes.querySelector('.nav-list-repair')
  const buttonSliders = [...repairTypes.querySelectorAll(".repair-types-nav__item")]

  const leftButton = repairTypes.querySelector('.slider-arrow_left')
  const rightButton = repairTypes.querySelector('.slider-arrow_right')
  const leftButtonNav = repairTypes.querySelector('.nav-arrow_left')
  const rightButtonNav = repairTypes.querySelector('.nav-arrow_right')

  const repairCounter = repairTypes.querySelector('.slider-counter-responsive')
  const counterCurrent = repairCounter.querySelector('.slider-counter-content__current')
  const counterTotal = repairCounter.querySelector('.slider-counter-content__total')

  // номер по порядку блока
  const indexBlock = block => +block.className.replace(/\D+/g, '') - 1

  // текущий блок
  let currentBlock = null

  // отображение кнопок навигации слайдов в блоке
  const showButton = () => {
    leftButton.classList.remove('hide')
    rightButton.classList.remove('hide')

    if (currentBlock.currentSlide === 0) {
      leftButton.classList.add('hide')
    }
    if (currentBlock.currentSlide + 1 === currentBlock.slides.length) {
      rightButton.classList.add('hide')
    }
  }

  // отображение кнопок навигации блоков в мобильной версии
  const showButtonNav = () => {
    const numBlock = indexBlock(currentBlock)

    leftButtonNav.classList.remove('hide')
    rightButtonNav.classList.remove('hide')

    if (numBlock === 0) {
      leftButtonNav.classList.add('hide')
    }
    if (numBlock === buttonSliders.length - 1) {
      rightButtonNav.classList.add('hide')
    }
  }

  // установить текущий блок
  const setCurrentBlock = (block) => {
    if (block === currentBlock) return

    if (currentBlock) {
      currentBlock.slides[currentBlock.currentSlide].classList.remove('repair-slide-current')
      currentBlock.classList.remove('active')
    }

    currentBlock = block
    currentBlock.classList.add('active')
    currentBlock.slides[currentBlock.currentSlide].classList.add('repair-slide-current')
    counterCurrent.textContent = `${currentBlock.currentSlide + 1}`
    counterTotal.textContent = `${currentBlock.slides.length}`

    showButton()

    // дополнительно для мобильной версии
    navSlider.style.left = -100 * indexBlock(currentBlock) + '%'
    showButtonNav()
  }

  // навигация слайдов в текущем блоке
  const navSlides = (direction) => {
    currentBlock.slides[currentBlock.currentSlide].classList.remove('repair-slide-current')

    currentBlock.currentSlide = direction > 0
      ? Math.min(currentBlock.slides.length - 1, currentBlock.currentSlide + 1)
      : Math.max(0, currentBlock.currentSlide - 1)

    currentBlock.slides[currentBlock.currentSlide].classList.add('repair-slide-current')
    counterCurrent.textContent = `${currentBlock.currentSlide + 1}`

    showButton()
  }

  // навигация блоков в мобильной версии
  const navBlock = (direction) => {
    const numBlock = indexBlock(currentBlock)
    const preBlock = -100 * numBlock, step = -100 * direction

    animate({
      timingplane: 'easeInOutCubic',
      duration: 300,
      draw(progress)
      {
        navSlider.style.left = preBlock + step * progress + '%'

        if (progress === 1) {
          setCurrentBlock(buttonSliders[numBlock + direction])
        }
      }
    })
  }

  // навигация по клику мышки
  repairTypes.addEventListener('click', (e) => {
    let elem

    // навигация по блокам
    if ((elem = e.target.closest('.repair-types-nav__item'))) {
      setCurrentBlock(elem)

      // навигация слайдов в текущем блоке
    } else if ((elem = e.target.closest('.slider-arrow'))) {
      navSlides(elem.classList.contains('slider-arrow_right') ? 1 : -1)

      // навигация блоков в мобильной версии
    } else if ((elem = e.target.closest('.nav-arrow'))) {
      navBlock(elem.classList.contains('nav-arrow_right') ? 1 : -1)
    }
  })

  // прикрепляем ссылки на слайды к навигационным кнопкам блоков
  buttonSliders.forEach((button, index) => {
    button.slides = []

    // ссылки на хранилище слайдов текущего слайдера
    button.sliders = repairTypes.querySelector('.types-repair' + (index + 1))
    button.currentSlide = 0

    button.sliders.querySelectorAll('.repair-types-slider__slide')
      .forEach(sl => { button.slides.push(sl) })
  })

  // установить первый
  setCurrentBlock(buttonSliders[0])
}
