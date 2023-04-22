const { isEmpty } = require('../helpers/empty')

describe('isEmpty', () => {
  test('of empty value', () => {
    const Id = ''
    const result = isEmpty([Id])
    expect(result).toBe(true)
  })

  test('of full value', () => {
    const Id = '123'
    const result = isEmpty([Id])
    expect(result).toBe(false)
  })

  test('of array empty', () => {
    const result = isEmpty([])
    expect(result).toBe(true)
  })

  test('of array undefined', () => {
    const result = isEmpty()
    expect(result).toBe(true)
  })
})
