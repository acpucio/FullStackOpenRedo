import { useState } from 'react'


const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange,handleNumberChange }) => {
    
  return(
  <form onSubmit={onSubmit}>
    <div>
      name: <input
        value={newName}
        onChange={handleNameChange} />
    </div>
    <div>
      number: <input
        value={newNumber}
        onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const duplicateFound = persons.some(o => o.name === personObject.name)

    console.log('Found a duplicate?', duplicateFound)

    if (duplicateFound) {
      alert(`${personObject.name} is already added to phone book`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

 


  return (
    <div>
      <h2>Phonebook</h2>

      <PersonForm
        onSubmit={addPerson}
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}

      />

      <h2>Numbers</h2>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }} >
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
          </li>)}
      </ul>

    </div>
  )
}

export default App
