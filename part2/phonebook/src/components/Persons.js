import React from 'react'
import personService from '../services/persons'

const Persons = ( {persons, setPersons, newQuery} ) => {

  const personsToShow = !newQuery
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newQuery.toLowerCase()))

  const handleDelete = (id) => {

    const person = persons.find(n => n.id === id)

    personService
    .remove(person.id)
    .then(persons => {
      setPersons(persons.filter(person => person.id !== id)) 
    })
  }
  return (
    <>
        <ul>
        {personsToShow.map(person =>
        <div> <li key={person.id}>{person.name}{' '}{person.number}
<button onClick= {() => handleDelete}>delete</button>
        </li>
        </div> 
        )}
      </ul>
    </>
  )
}

export default Persons