const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

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

app.use(morgan('tiny'))

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

    if (!person) {
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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const max = 200000    
    return Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const unique = []

    const duplicates = persons.filter(o => {
        if(unique.find(i => i.name === o.name )){
            return true
        }
        unique.push(o)
        return false;
    })

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    } else if (!body.number){
        return response.status(400).json({
            error: 'number is missing'
        })
    } else if (duplicates){
        return response.status(400).json({
            error: 'names must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    console.log(person)
    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})