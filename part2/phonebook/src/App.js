import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = ( ) => {
  const [ persons, setPersons ] = useState([ ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  
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