import React from 'react'
import personService from '../services/persons'

const PersonForm = ( {error, setError, setMessage, setNewName, setNewNumber, setPersons, newName, newNumber, persons, handleNameChange, handleNumberChange}) => {
   
  const addName = (event) => {
        event.preventDefault()
    
        const nameObject = {
          name: newName, 
          number: newNumber
        }
        if (persons.some(person => person.name === newName)){
          alterNumber (nameObject, newNumber)
        }
        else
        {
          personService
          .create(nameObject)
          .then(returnedPerson => {
            setError(false)
            setPersons(persons.concat(returnedPerson))
            setMessage(`added '${returnedPerson.name}' `)
            setTimeout(() => {setMessage(null)}, 5000)
            setNewName('')
            setNewNumber('')
          })
        } 
      }

  const alterNumber = (nameObject, newNumber) => {
    console.log("error = ", error)
        if (window.confirm(` ${newName} is already added to phonebook, replace the old number with a new one?` )) {
        const personToChange = persons.find(person => person.name === newName)
        const changedObject = {... personToChange, number: newNumber}
        personService
        .alter(personToChange.id, changedObject)
        .then(returnedPerson => {
         setPersons(persons.map(person => person.id !== personToChange.id ? person : returnedPerson))
         setNewName('')
         setNewNumber('')
        })
        .catch(error => {
          setError(true)
          setMessage(`Information of '${newName}' has already been removed from server`)
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.filter(person => person.id !== personToChange.id))
          setNewName('')
          setNewNumber('')
        })
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