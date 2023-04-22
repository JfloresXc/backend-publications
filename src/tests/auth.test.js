const moongose = require('mongoose')
const UserModel = require('../models/User.model')
const { server } = require('../index')
const {
  api,
  API_URLS,
  USERS
} = require('./helpers')

const { authUrl: API_URL } = API_URLS

beforeEach(async () => {
  await UserModel.deleteMany()
  for (const user of USERS) {
    const userToAdded = new UserModel(user)
    await userToAdded.save()
  }
})

describe('auth', () => {
  test('empty password or email is not created', async () => {
    await api
      .post(`${API_URL}/signup`)
      .send({})
      .expect(400)
  })

  test('already existed email is not created', async () => {
    await api
      .post(`${API_URL}/signup`)
      .send(USERS[0])
      .expect(405)
  })

  test('length password less than 3 is not created', async () => {
    await api
      .post(`${API_URL}/signup`)
      .send({ email: 'test2@test.com', password: 'te' })
      .expect(400)
  })

  test('a correct user is created', async () => {
    await api
      .post(`${API_URL}/signup`)
      .send({ email: 'test3@test.com', password: 'test2' })
      .expect(202)
  })

  test('a incorrect user is not logged', async () => {
    await api
      .post(`${API_URL}/signin`)
      .send({ email: 'wrong@wrong.com', password: 'wrong' })
      .expect(405)
  })

  test('a incorrect password is not logged', async () => {
    await api
      .post(`${API_URL}/signin`)
      .send({ email: USERS[0].email, password: 'wrong' })
      .expect(405)
  })

  test('a correct user is logged', async () => {
    await api
      .post(`${API_URL}/signin`)
      .send(USERS[0])
      .expect(202)
  })
})

afterAll(() => {
  server.close()
  moongose.connection.close()
})
