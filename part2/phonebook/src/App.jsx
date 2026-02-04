import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(response => {
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

  const handleDelete = (id, name) => {
    const ok = window.confirm(`Delete ${name}`)
    if (!ok) return

    personService.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const normalizedNewName = newName.trim().toLowerCase()

    const existingPerson = persons.find(
      (person) => person.name.trim().toLowerCase() === normalizedNewName
    )

    if (existingPerson) {
      const ok = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (!ok) return

      const updatedPerson = { ...existingPerson, number: newNumber.trim() }

      personService.update(existingPerson.id, updatedPerson).then(response => {
        setPersons(
          persons.map(person => 
            person.id !== existingPerson.id ? person : response.data
          )
        )
        setNewName('')
        setNewNumber('')
      })
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    personService.create(personObject).then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App