/* Лейдинг. Слайдер портфолио */

import { animate, smoothScroll } from '../modules/helpers.js'

/* Слайдер карточек */
const portfolioPopup = (callingBlock, calbackHarmonization) => {
  const slider = document.querySelector('.popup-portfolio')
  const sliderImg = slider.querySelector('.popup-portfolio-slider')
  const sliderText = slider.querySelector('.popup-portfolio-slider-text')

  const qtySlides = sliderImg.querySelectorAll('.popup-portfolio-slider__slide').length

  const leftButton = slider.querySelector('.nav-arrow_left')
  const rightButton = slider.querySelector('.nav-arrow_right')

  const sliderCounter = slider.querySelector('.slider-counter')
  const counterCurrent = sliderCounter.querySelector('.slider-counter-content__current')
  const counterTotal = sliderCounter.querySelector('.slider-counter-content__total')

  // отображение кнопок навигации слайдов в слайдере карточек
  const showButton = () => {
    leftButton.classList.remove('hide')
    rightButton.classList.remove('hide')

    if (document.portfolioCurrentSlide === 0) {
      leftButton.classList.add('hide')
    }
    if (document.portfolioCurrentSlide === qtySlides - 1) {
      rightButton.classList.add('hide')
    }
  }

  // активизация текущей карточки
  const setCurrentCard = () => {
    sliderImg.style.left = -document.portfolioCurrentSlide * 100 + '%'
    sliderText.style.left = -document.portfolioCurrentSlide * 100 + '%'
    counterCurrent.textContent = document.portfolioCurrentSlide + 1

    showButton()
  }

  // навигация блоков в слайдере карточек
  const navCard = (direction) => {
    const numBlock = document.portfolioCurrentSlide
    const preBlock = -100 * numBlock, step = -100 * direction

    document.portfolioCurrentSlide = direction > 0
      ? Math.min(qtySlides - 1, document.portfolioCurrentSlide + 1)
      : Math.max(0, document.portfolioCurrentSlide - 1)

    animate({
      timingplane: 'easeInOutCubic',
      duration: 400,
      draw(progress)
      {
        sliderImg.style.left = preBlock + step * progress + '%'
        sliderText.style.left = preBlock + step * progress + '%'

        if (progress === 1) {
          setCurrentCard()
        }
      }
    })
  }

  const portfolioSliderCard = (e) => {
    let elem

    // навигация слайдов в слайдере карточек
    if ((elem = e.target.closest('.nav-arrow'))) {
      navCard(elem.classList.contains('nav-arrow_right') ? 1 : -1)

    } else if (e.target.closest('.close') ||
      e.target.closest('.popup') && e.target.classList.contains('active-popup')) {
      slider.removeEventListener('click', portfolioSliderCard)
      callingBlock.classList.remove('hide')
      calbackHarmonization()
      smoothScroll('.portfolio-title')
    }
  }

  slider.addEventListener('click', portfolioSliderCard)

  counterTotal.textContent = `${qtySlides}`

  // при вызове, отобразить текущий блок
  setCurrentCard()

  // закрыть вызвавший карточку блок
  callingBlock.classList.add('hide')
}

// основной слайдер: десктопный (по два слайдв в столбце) и мобильный (однослайдовый)
export const portfolioSlider = () => {
  const portfolio = document.querySelector('.portfolio-slider-wrap')

  const maxiWrap = portfolio.querySelector('.portfolio-wrap-desktop')
  const maxiSlider = maxiWrap.querySelector('.portfolio-slider')
  const maxiSlides = maxiSlider.querySelectorAll('.portfolio-slider__slide-frame')

  const miniWrap = portfolio.querySelector('.portfolio-wrap-mobile')
  const miniSlider = miniWrap.querySelector('.portfolio-slider-mobile')
  const miniSlides = miniSlider.querySelectorAll('.portfolio-slider__slide-frame')
  const qtySlides = miniSlides.length
  const qtyFrames = qtySlides / 2

  const leftButtonMaxi = portfolio.querySelector('#portfolio-arrow_left')
  const rightButtonMaxi = portfolio.querySelector('#portfolio-arrow_right')
  const leftButtonMini = portfolio.querySelector('#portfolio-arrow-mobile_left')
  const rightButtonMini = portfolio.querySelector('#portfolio-arrow-mobile_right')

  const sliderCounter = miniWrap.querySelector('.slider-counter')
  const counterCurrent = sliderCounter.querySelector('.slider-counter-content__current')
  const counterTotal = sliderCounter.querySelector('.slider-counter-content__total')

  // отображение кнопок навигации слайдов в десктопном и мобильном слайдере
  const showButton = () => {
    leftButtonMaxi.classList.remove('hide')
    rightButtonMaxi.classList.remove('hide')
    leftButtonMini.classList.remove('hide')
    rightButtonMini.classList.remove('hide')

    if (document.portfolioCurrentSlide < 2) {
      leftButtonMaxi.classList.add('hide')
    }
    if (document.portfolioCurrentSlide > qtySlides - 3) {
      rightButtonMaxi.classList.add('hide')
    }
    if (document.portfolioCurrentSlide === 0) {
      leftButtonMini.classList.add('hide')
    }
    if (document.portfolioCurrentSlide === qtySlides - 1) {
      rightButtonMini.classList.add('hide')
    }
  }

  // установка смещения фрейма текущего слайда для десктопного слайдера
  const setFrameLeft = () => {
    const hideLeft = -parseInt(maxiSlider.style.left)
    const stepMaxi = maxiSlider.currentWidth / qtyFrames
    const showFrame = Math.ceil((document.portfolioCurrentSlide + 1) / 2)
    const minHideLeft = Math.max(0, showFrame * stepMaxi - maxiWrap.currentWidth)
    const maxHideLeft = (showFrame - 1) * stepMaxi - Math.max(0, maxiWrap.currentWidth - (qtyFrames - showFrame + 1) * stepMaxi)

    if (hideLeft < minHideLeft) { // не видно начала слайда
      maxiSlider.style.left = -minHideLeft + 'px'

    } else if (hideLeft > maxHideLeft) { // не видно конца слайда
      maxiSlider.style.left = -maxHideLeft + 'px'
    }
  }

  // активизация текущего слайда
  const setCurrent = () => {
    setFrameLeft()

    miniSlider.style.left = -document.portfolioCurrentSlide * 100 + '%'
    counterCurrent.textContent = document.portfolioCurrentSlide + 1

    showButton()
  }

  // навигация блоков в десктопном слайдере
  const navMaxi = (direction) => {
    const hideLeft = -parseInt(maxiSlider.style.left)
    const stepMaxi = maxiSlider.currentWidth / qtyFrames

    let showFrame, scroll

    if (direction > 0) {
      showFrame = Math.min(qtyFrames, Math.round((hideLeft + maxiWrap.currentWidth + stepMaxi) / stepMaxi))
      scroll = hideLeft + (maxiWrap.currentWidth - showFrame * stepMaxi)

    } else {
      showFrame = Math.max(1, Math.round(hideLeft / stepMaxi))
      scroll = hideLeft - (showFrame - 1) * stepMaxi
    }

    document.portfolioCurrentSlide = (showFrame - 1) * 2 + (document.portfolioCurrentSlide % 2 ? 1 : 0)

    animate({
      timingplane: 'easeInOutCubic',
      duration: 400,
      draw(progress)
      {
        maxiSlider.style.left = -hideLeft + scroll * progress + 'px'

        if (progress === 1) {
          setCurrent()
        }
      }
    })
  }

  // навигация блоков в мобильном слайдере
  const navMini = (direction) => {
    const numBlock = document.portfolioCurrentSlide
    const preBlock = -100 * numBlock
    const step = -100 * direction

    document.portfolioCurrentSlide = direction > 0
      ? Math.min(qtySlides - 1, document.portfolioCurrentSlide + 1)
      : Math.max(0, document.portfolioCurrentSlide - 1)

    animate({
      timingplane: 'easeInOutCubic',
      duration: 400,
      draw(progress)
      {
        miniSlider.style.left = preBlock + step * progress + '%'

        if (progress === 1) {
          setCurrent()
        }
      }
    })
  }

  const portfolioSlider = (e) => {
    const isDesktop = e.target.closest('.mobile-hide')

    let elem

    // навигация слайдов в слайдере
    if ((elem = e.target.closest('.slider-arrow'))) {
      if (isDesktop) {
        navMaxi(elem.classList.contains('slider-arrow_right') ? 1 : -1)
      } else {
        navMini(elem.classList.contains('slider-arrow_right') ? 1 : -1)
      }

      // просмотр одного слайда из слайдера
    } else if ((elem = e.target.closest('.portfolio-slider__slide-frame'))) {
      document.portfolioCurrentSlide = elem.number

      portfolioPopup(portfolio, setCurrent)

      document.modalList.open('popup-portfolio')
    }
  }

  portfolio.addEventListener('click', portfolioSlider)

  // контроль состояния слайдера при изменении размеров экрана просмотра
  portfolio.resizeObserver = new window.ResizeObserver(entries => {
    entries.forEach((entry) => {
      const width = entry.borderBoxSize
        ? Math.round(entry.borderBoxSize[0].inlineSize)
        : Math.round(entry.contentRect.width)

      const dWidth = width - (entry.target.currentWidth || 0)

      entry.target.currentWidth = width

      if (entry.target === maxiWrap && width && dWidth) {
        setFrameLeft()
      }
    })
  })

  portfolio.resizeObserver.observe(maxiSlider)
  portfolio.resizeObserver.observe(maxiWrap)

  // первоначальная инициалиазия
  counterTotal.textContent = `${qtySlides}`

  // текущий слайд
  document.portfolioCurrentSlide = 0
  maxiSlider.style.left = '0px'

  // нумерация слайдов
  maxiSlides.forEach((slide, index) => slide.number = index)
  miniSlides.forEach((slide, index) => slide.number = index)
}
