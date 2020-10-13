import React from 'react'

const PersonForm = ( {setNewName, setNewNumber, setPersons, newName, newNumber, persons, handleNameChange, handleNumberChange}) => {
   
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
      return (
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
      )
    
}
export default PersonForm