const valid = require('card-validator')
const validatorEmail = require('email-validator')

export function validationCardNumber(number) {
  const isValid = valid.number(number).isValid
  if (isValid) return [isValid]
  let invalidText = ''

  if (number.length < 16) {
    invalidText += 'Номер карты должен содержать не менее 16 цифр '
  }

  if (number.length >= 16) {
    invalidText += 'Введите корректный номер карты '
  }

  return [isValid, invalidText]
}

export function validationDate(date) {
  const isValid = valid.expirationDate(date).isValid
  if (isValid) return [isValid]
  let invalidText = 'Проверьте срок действия карты'

  return [isValid, invalidText]
}

export function validationCVV(cvv) {
  const isValid = valid.cvv(cvv).isValid
  if (isValid) return [isValid]
  let invalidText = 'CVV должен содержать 3 цифры '

  return [isValid, invalidText]
}

export function validationEmail(email) {
  const isValid = validatorEmail.validate(email)
  if (isValid) return [isValid]
  let invalidText = ''
  console.log(email)

  if (email.length < 3) {
    invalidText += 'Длина email должна быть больше двух символов'
    return [isValid, invalidText]
  }

  if (!email.includes('@')) {
    invalidText += 'Email должен содержать знак @ '
    return [isValid, invalidText]
  }

  invalidText = 'Проврьте email'

  return [isValid, invalidText]
}
