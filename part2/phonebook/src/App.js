import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([ { name: ' Arto Hellas '} ]) 
  const [ newName, setNewName ] = useState( ' a new name... ')
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log('button clicked', event.target)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map(person =>
        <li key={person.name}>{person.name}</li>
        )}
      </ul>
      <form onSubmit={addName}>
        <div>

          name: <input value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}
        </div>
      <h2>Numbers</h2>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}


export default App