/* Лейдинг. Второй номер телефона при клике на стрелочку  */

export const secondPhoneNumber = () => {
  const btnArrow = document.querySelector('.header-contacts__arrow')
  const headerAccord = document.querySelector('.header-contacts__phone-number-accord')
  const phoneNumber = headerAccord.querySelector('.header-contacts__phone-number')

  btnArrow.addEventListener('click', () => {
    btnArrow.classList.toggle('open')
    headerAccord.classList.toggle('open')
    phoneNumber.classList.toggle('open')
  })
}
