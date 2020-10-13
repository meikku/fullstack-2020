import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([ 
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' } ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  
  const handleNameChange = (event) => {
    event.preventDefault()
      console.log(event.target.value)
      setNewName(event.target.value)  
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
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