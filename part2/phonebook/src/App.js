import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = ( ) => {
  const [ persons, setPersons ] = useState([ ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  const [ personsToShow, setPersonsToShow] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError] = useState(false)


  
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
      <Notification message={message} error={error}/>
      <Filter   handleQuery={handleQuery}/>
      <h3>add a new</h3>
      <PersonForm error={error} setError={setError} message={message} setMessage={setMessage} setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} newName={newName} newNumber={newNumber} persons={persons} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers </h3>
      <Persons persons={persons} newQuery={newQuery} setPersons={setPersons} personsToShow={personsToShow} setPersonsToShow={setPersonsToShow}/>
    </div>
  )
}


export default App