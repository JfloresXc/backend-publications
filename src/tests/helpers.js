const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2NDM5ZWQwNTlkNGIxMmNkZWUzNjk2ZjEiLCJpYXQiOjE2ODE2MDQ4MDUsImV4cCI6MTY4MTY5MTIwNX0.cADW_yaxoHFRrtCx08qjTUfIPcZJ-uJThH9zxsvSZU4'
const API_URLS = {
  publicationUrl: '/api/publications',
  authUrl: '/api/auth'
}

const HEADERS = { Authorization: TOKEN }

const PUBLICATIONS = [
  {
    title: 'Test 1 Title',
    description: 'Test 1 Desc'
  },
  {
    title: 'Test 2 Title',
    description: 'Test 2 Desc'
  }
]

const USERS = [
  {
    username: 'test',
    email: 'test@test.com',
    password: 'test'
  }
]

const getAllPublications = async () => {
  const { body: publications } = await api
    .get(`${API_URLS.publicationUrl}`)
    .set('Authorization', TOKEN)

  return { publications }
}

module.exports = {
  api,
  PUBLICATIONS,
  USERS,
  HEADERS,
  API_URLS,
  getAllPublications
}
