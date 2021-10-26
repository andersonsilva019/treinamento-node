const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const customers = []


// Middleware
function verifyIfExitsAccountCPF(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" })
  }

  request.customer = customer

  return next()
}

app.post('/account', (request, response) => {
  const { cpf, name } = request.body

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" })
  }

  const customer = {
    id: uuidv4(),
    cpf,
    name,
    statement: []
  }

  customers.push(customer)

  return response.status(201).send(customer)

})

app.get('/statement', verifyIfExitsAccountCPF, (request, response) => {
  const { customer } = request
  return response.json(customer.statement)
})

app.post('/deposit', verifyIfExitsAccountCPF, (request, response) => {
  const { customer } = request
  const { description, amount } = request.body

  if (amount <= 0) {
    return response.status(400).json({ error: "Invalid deposit" })
  }

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})
app.listen(3333)