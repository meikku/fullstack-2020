import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([ { id: 'Arto Hellas', name: 'Arto Hellas', number: '040-1234567'} ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    
    
    const nameObject = {
      name: newName,
      id: newName,
      number: newNumber
    }
    if (persons.some(person => person.id === newName))
    {
     window.alert(` ${newName} is already added to phonebook` )
     setNewName('')
    }
    else
    {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } 
  }

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

  return (
    <div>
      <h2>Phonebook</h2>
     
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}
        </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}{' '}{person.number}</li>
        )}
      </ul>
    
    </div>
  )
}


export default App