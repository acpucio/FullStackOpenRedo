const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    
    if(!person){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    console.log(person)
    response.json(person)
  })

app.get("/info", (request, response) => {
    const count = persons.length
    date = Date()
    response.send(`Phonebook has info for ${count} people <br>
    ${date}`
    )

})  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})