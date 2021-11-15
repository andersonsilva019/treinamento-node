import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response.send('<h1>Hello</h1>')
})

app.listen(3333, () => console.log('Server on'))