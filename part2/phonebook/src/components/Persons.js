import React from 'react'
import personService from '../services/persons'

const Persons = ( {persons, setPersons, newQuery, personsToShow} ) => {

  personsToShow = !newQuery
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newQuery.toLowerCase()))

  const handleDelete = (name, id) => {
    console.log("name = ", name)
    console.log("id =", id)
    if (window.confirm(`Delete '${name}' ?`))
    
    personService
    .remove(id)
    .then(setPersons(persons.filter(person => person.id !== id ))
    )
  }
  return (
    <>
        <ul>
        {personsToShow.map(person =>
        <li key={person.id}>{person.name}{' '}{person.number}
        <button onClick= {() => handleDelete(person.name, person.id)}>delete</button>
        </li> 
        )}
      </ul>
    </>
  )
}

export default Persons