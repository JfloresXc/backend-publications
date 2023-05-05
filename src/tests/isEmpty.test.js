const { isSomeEmpty } = require('../helpers/validations')

describe('isEmpty', () => {
  test('of empty value', () => {
    const Id = ''
    const result = isSomeEmpty([Id])
    expect(result).toBe(true)
  })

  test('of full value', () => {
    const Id = '123'
    const result = isSomeEmpty([Id])
    expect(result).toBe(false)
  })

  test('of array empty', () => {
    const result = isSomeEmpty([])
    expect(result).toBe(true)
  })

  test('of array undefined', () => {
    const result = isSomeEmpty()
    expect(result).toBe(true)
  })
})
