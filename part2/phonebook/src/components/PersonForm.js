import React from 'react'
import axios from 'axios'

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
          axios
          .post('http://localhost:3001/persons', nameObject)
          .then(response => {
          console.log(response)
          })

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