const moongose = require('mongoose')
const Publication = require('../models/Publications.models')
const { server } = require('../index')
const {
  api,
  PUBLICATIONS,
  API_URLS,
  HEADERS,
  getAllPublications
} = require('./helpers')

const { publicationUrl: API_URL } = API_URLS

beforeEach(async () => {
  await Publication.deleteMany()

  for (const publication of PUBLICATIONS) {
    const publicationModel = new Publication(publication)
    await publicationModel.save()
  }
})

describe('publications', () => {
  test('are returned as json and status 200', async () => {
    await api
      .get(`${API_URL}`)
      .set(HEADERS)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`there are ${PUBLICATIONS.length} objects`, async () => {
    const { publications } = await getAllPublications()

    expect(publications).toHaveLength(PUBLICATIONS.length)
  })

  const description1 = PUBLICATIONS[0].description
  test(`to contains ${description1}`, async () => {
    const { publications } = await getAllPublications()

    const descriptions = publications.map(item => item.description)
    expect(descriptions).toContain(description1)
  })

  test('one note is not received with incorrect id', async () => {
    await api
      .get(`${API_URL}/1234`)
      .set(HEADERS)
      .expect(400)
  })

  test('one note is received with correct id', async () => {
    const { publications } = await getAllPublications()
    const [firstPublication] = publications

    const { body: onePublication } = await api
      .get(`${API_URL}/${firstPublication.id}`)
      .set(HEADERS)
      .expect(200)

    const descriptions = publications.map(item => item.description)
    expect(descriptions).toContain(onePublication.description)
  })

  test('a empty note is not added', async () => {
    const newObject = {
      title: '',
      description: 'Test 3 Desc'
    }

    await api
      .post(`${API_URL}`)
      .set(HEADERS)
      .send(newObject)
      .expect(400)
  })

  test('a valid note can be added', async () => {
    const newObject = {
      title: 'Test 3 Title',
      description: 'Test 3 Desc'
    }

    const { body: addedPublication } = await api
      .post(`${API_URL}`)
      .set(HEADERS)
      .send(newObject)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { publications } = await getAllPublications()
    const descriptions = publications.map(item => item.description)

    expect(descriptions).toContain(addedPublication.description)
  })

  test('a note is not deleted for empty id', async () => {
    await api
      .delete(`${API_URL}`)
      .set(HEADERS)
      .expect(400)
  })

  test('a note is deleted for id', async () => {
    const { publications: firstResponde } = await getAllPublications()

    await api
      .delete(`${API_URL}/${firstResponde[0].id}`)
      .set(HEADERS)
      .expect(200)

    const { publications: secondResponse } = await getAllPublications()
    expect(secondResponse).toHaveLength(firstResponde.length - 1)
  })
})

afterAll(() => {
  server.close()
  moongose.connection.close()
})
