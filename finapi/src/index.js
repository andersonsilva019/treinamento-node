const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const constumers = []

app.post('/account', (request, response) => {
  const { cpf, name } = request.body
  const id = uuidv4()

  const customer = { id, cpf, name, statement: [] }

  constumers.push(customer)

  return response.status(201).send(customer)

})

app.listen(3333)