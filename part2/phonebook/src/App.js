import { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'


const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange,handleNumberChange }) => {
  console.log('this works')  
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
      console.log('promise fulfillled')
      setPersons(initialPersons)
      })
  },[])

  
  console.log('persons', persons.length, 'length')

  const deletePerson = id => {

    const person = persons.find(n => n.id ===id)

    if(window.confirm(`Delete ${person.name}?`)){
      personService
      .deletePerson(id)
      .then((response) =>{
        const updatedPersons = persons.filter(n => n.id !== id)
        setPersons(updatedPersons);
      })
      
    }
  }

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
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      
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
          <Person
            personId={person.id}
            name = {person.name} 
            number = {person.number}
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </ul>

    </div>
  )
}

export default App
