import React from 'react'
import personService from '../services/persons'
import Notification from '../components/Notification'

const PersonForm = ( {errorMessage, setErrorMessage, setInfoMessage, setNewName, setNewNumber, setPersons, newName, newNumber, persons, handleNameChange, handleNumberChange}) => {
   
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
            setPersons(persons.concat(returnedPerson))
            setInfoMessage(`added '${returnedPerson.name}' `)
            setTimeout(() => {setInfoMessage(null)}, 5000)
            setNewName('')
            setNewNumber('')
          })
        } 
      }
  const alterNumber = (nameObject, newNumber) => {
    console.log("nameObject =", nameObject)
    console.log("newNumber = ", newNumber)
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
          setErrorMessage(`Information of '${newName}' has already been removed from server`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setPersons(persons.filter(person => person.id !== personToChange.id))
          setNewName('')
          setNewNumber('')
        })
      }
      }
      
     
      return (
        <div>
          <Notification message={errorMessage}/>
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
        </div>
      )
    
}
export default PersonForm