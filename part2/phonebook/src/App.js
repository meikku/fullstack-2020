import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([ 
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' } ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  
  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName))
    {
     window.alert(` ${newName} is already added to phonebook` )
     setNewName('')
     setNewNumber('')
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
  const handleQuery = (event) => {
   setNewQuery(event.target.value)
  }
  
  const personsToShow = !newQuery
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newQuery.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
          filter shown with <input query="text" onChange={handleQuery}>
          </input>
      </form>
     
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name}{' '}{person.number}</li>
        )}
      </ul>
    
    </div>
  )
}


export default App