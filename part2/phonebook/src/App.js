import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = ( ) => {
  const [ persons, setPersons ] = useState([ ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  
  const handleNameChange = (event) => {
    event.preventDefault()
      setNewName(event.target.value)  
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }
  const handleQuery = (event) => {
   setNewQuery(event.target.value)
  }
  
  
  return (
    <div>
      <h3>Phonebook</h3>
      <Filter   handleQuery={handleQuery}/>
      <h3>add a new</h3>
      <PersonForm setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} newName={newName} newNumber={newNumber} persons={persons} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers </h3>
      <Persons persons={persons} newQuery={newQuery} />
    </div>
  )
}


export default App