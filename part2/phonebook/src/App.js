import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([ { id: 'Arto Hellas', name: ' Arto Hellas '} ]) 
  const [ newName, setNewName ] = useState( '')
  
  const addName = (event) => {
    event.preventDefault()
    
    
    const nameObject = {
      name: newName,
      id: newName,
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
    } 
  }

  const handleNameChange = (event) => {
    event.preventDefault()
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


export default App