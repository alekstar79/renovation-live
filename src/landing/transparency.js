/* Лейдинг. Блок с документами */

import { animate, smoothScroll } from '../modules/helpers.js'

const showButton = (lb, rb, ln) => {
  lb.classList.remove('hide')
  rb.classList.remove('hide')

  if (document.transparencyCurrentSlide === 0) {
    lb.classList.add('hide')
  }
  if (document.transparencyCurrentSlide === ln - 1) {
    rb.classList.add('hide')
  }
}

// модальный слайдер документов
const transparencyPopup = (callingBlock, calbackHarmonization) => {
  const transparency = document.querySelector('.popup-transparency')

  const rightButton = transparency.querySelector('.nav-arrow_right')
  const leftButton = transparency.querySelector('.nav-arrow_left')

  const slider = transparency.querySelector('.popup-transparency-slider')
  const slides = slider.querySelectorAll('.popup-transparency-slider__slide')

  const qtySlides = slides.length

  const sliderCounter = transparency.querySelector('#transparency-popup-counter')
  const counterCurrent = sliderCounter.querySelector('.slider-counter-content__current')
  const counterTotal = sliderCounter.querySelector('.slider-counter-content__total')

  // активизация текущего слайда
  const setCurrentBlock = () => {
    slider.style.left = -document.transparencyCurrentSlide * 100 + '%'
    counterCurrent.textContent = document.transparencyCurrentSlide + 1
    showButton(leftButton, rightButton, qtySlides)
  }

  // навигация блоков в слайдере
  const navBlock = (direction) => {
    const numBlock = document.transparencyCurrentSlide
    const preBlock = -100 * numBlock, step = -100 * direction

    document.transparencyCurrentSlide = direction > 0
      ? Math.min(qtySlides - 1, document.transparencyCurrentSlide + 1)
      : Math.max(0, document.transparencyCurrentSlide - 1)

    animate({
      timingplane: 'easeInOutCubic',
      duration: 400,
      draw(progress)
      {
        slider.style.left = preBlock + step * progress + '%'

        if (progress === 1) {
          setCurrentBlock()
        }
      }
    })
  }

  const transparencySlider = (e) => {
    let elem

    // навигация слайдов в слайдере
    if ((elem = e.target.closest('.nav-arrow'))) {
      navBlock(elem.classList.contains('nav-arrow_right') ? 1 : -1)

    } else if (e.target.closest('.close') ||
      e.target.closest('.popup') && e.target.classList.contains('active-popup')) {
      transparency.removeEventListener('click', transparencySlider)

      callingBlock.classList.remove('hide')
      calbackHarmonization()

      smoothScroll('.transparency-title')
    }
  }

  transparency.addEventListener('click', transparencySlider)

  counterTotal.textContent = `${qtySlides}`

  // при вызове, отобразить текущий блок
  setCurrentBlock()

  // закрыть вызвавший карточку блок
  callingBlock.classList.add('hide')
}

// мобильный слайдер документов
export const transparency = () => {
  const transparency = document.querySelector('.transparency-slider')

  const rightButton = transparency.querySelector('#transparency-arrow_right')
  const leftButton = transparency.querySelector('#transparency-arrow_left')

  const wrap = transparency.querySelector('.transparency-slider-wrap')
  const slider = wrap.querySelector('.row')
  const slides = slider.querySelectorAll('.transparency-item')

  const qtySlides = slides.length

  // активизация текущего слайда
  const setCurrent = () => {
    slider.style.left = -document.transparencyCurrentSlide * 100 + '%'
    showButton(leftButton, rightButton, qtySlides)
  }

  // навигация блоков в слайдере
  const navSlider = (direction) => {
    const numBlock = document.transparencyCurrentSlide
    const preBlock = -100 * numBlock, step = -100 * direction

    document.transparencyCurrentSlide = direction > 0
      ? Math.min(qtySlides - 1, document.transparencyCurrentSlide + 1)
      : Math.max(0, document.transparencyCurrentSlide - 1)

    animate({
      timingplane: 'easeInOutCubic',
      duration: 400,
      draw(progress)
      {
        slider.style.left = preBlock + step * progress + '%'

        if (progress === 1) {
          setCurrent()
        }
      }
    })
  }

  const transparencySlider = (e) => {
    let elem

    // навигация слайдов в слайдере
    if ((elem = e.target.closest('.slider-arrow'))) {
      navSlider(elem.classList.contains('slider-arrow_right') ? 1 : -1)

      // просмотр одного документа из слайдера
    } else if ((elem = e.target.closest('.transparency-item'))) {
      document.transparencyCurrentSlide = elem.number

      transparencyPopup(transparency, setCurrent)

      document.modalList.open('popup-transparency')
    }
  }

  transparency.addEventListener('click', transparencySlider)

  // первоначальная инициалиазия
  // нумерация слайдов
  slides.forEach((slide, index) => slide.number = index)

  // текущий слайд
  document.transparencyCurrentSlide = 0

  // активизация текущего слайда
  setCurrent()
}
