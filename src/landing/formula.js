/* Лендинг. Формула успшности */

import { animate } from '../modules/helpers.js'

export const formula = () => {
  const formula = document.querySelector('.formula')
  const formulaSlider = formula.querySelector('.formula-slider')
  const slides = formula.querySelectorAll('.formula-slider__slide')
  const btnLeft = formula.querySelector('#formula-arrow_left')
  const btnRight = formula.querySelector('#formula-arrow_right')

  // выбранный в tablet
  let formulaItem = null
  // номер текущего слайда
  let numSlide = 1

  slides[0].classList.add('active-item')
  btnLeft.classList.add('hide')

  formula.addEventListener('mouseover', ({ target }) => {
    if (target.closest('.formula-item__icon')) {
      // если перескочили между формулами
      if (formulaItem) {
        formulaItem.classList.remove('active-item', 'rotate')
      }

      formulaItem = target.classList.contains('formula-item__icon')
        ? target.parentElement
        : target.parentElement.parentElement

      const popup = formulaItem.querySelector('.formula-item-popup')
      const rotate = formulaItem.getBoundingClientRect().top > popup.offsetHeight

      formulaItem.classList.add('active-item')

      if (rotate) {
        formulaItem.classList.add('rotate')
      }
    }
  })

  formula.addEventListener('mouseout', ({ target }) => {
    if (target.closest('.formula-item__icon')) {
      if (formulaItem) {
        formulaItem.classList.remove('active-item', 'rotate')
      }

      formulaItem = null
    }
  })

  formula.addEventListener('click', ({ target }) => {
    if (target.closest('.slider-arrow')) {
      const preSlide = -100 * (numSlide - 1),
        step = target.closest('#formula-arrow_right')
          ? -100
          : 100

      slides[numSlide - 1].classList.remove('active-item')

      if (step < 0) {
        numSlide++
      } else {
        numSlide--
      }

      btnLeft.classList.remove('hide')
      btnRight.classList.remove('hide')

      if (numSlide === 1) btnLeft.classList.add('hide')
      if (numSlide === 6) btnRight.classList.add('hide')

      animate({
        timingplane: 'easeInOutCubic',
        duration: 500,
        draw(progress)
        {
          formulaSlider.style.left = preSlide + step * progress + '%'

          if (progress === 1) {
            slides[numSlide - 1].classList.add('active-item')
          }
        }
      })
    }
  })
}
