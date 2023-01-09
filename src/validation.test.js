/**
 * @jest-environment jsdom
 */
import { validationCardNumber, validationCVV } from './validation.js'

test('Валидация номера карты пропускает корректный номер карты', () => {
  expect(validationCardNumber('5469380041630731')[0]).toBe(true)
})

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  expect(validationCardNumber('54693а0041630731')[0]).toBe(false)
  expect(validationCardNumber('54693,0041630731')[0]).toBe(false)
  expect(validationCardNumber('54693/0041630731')[0]).toBe(false)
  expect(validationCardNumber('.4693а0041630731')[0]).toBe(false)
})

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  expect(validationCardNumber('546930041630731')[0]).toBe(false)
  expect(validationCardNumber('54693004163073')[0]).toBe(false)
  expect(validationCardNumber('5469')[0]).toBe(false)
})

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр', () => {
  expect(validationCardNumber('54693004163073121211212')[0]).toBe(false)
  expect(validationCardNumber('5469211212121212121212121212')[0]).toBe(false)
})

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
  expect(validationCVV('123')[0]).toBe(true)
  expect(validationCVV('456')[0]).toBe(true)
})

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
  expect(validationCVV('12')[0]).toBe(false)
  expect(validationCVV('45')[0]).toBe(false)
})

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами', () => {
  expect(validationCVV('1234')[0]).toBe(false)
  expect(validationCVV('4578')[0]).toBe(false)
})

test(`Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами
  (латиница, кириллица и знаки препинания)`, () => {
  expect(validationCVV('1,2')[0]).toBe(false)
  expect(validationCVV('4.5')[0]).toBe(false)
  expect(validationCVV('45a')[0]).toBe(false)
  expect(validationCVV('&45')[0]).toBe(false)
  expect(validationCVV('45/')[0]).toBe(false)
})
