import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const normalizedNewName = newName.trim().toLowerCase()

    const nameExists = persons.some(
      (person) => person.name.trim().toLowerCase() === normalizedNewName
    )

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) => 
    person.name.toLowerCase().includes(filter.trim().toLowerCase())  
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App