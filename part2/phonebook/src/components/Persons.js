import React from 'react'

const Persons = ( {persons, newQuery} ) => {

  const personsToShow = !newQuery
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newQuery.toLowerCase()))

  return (
    <>
        <ul>
        {personsToShow.map(person =>
        <div> <li key={person.id}>{person.name}{' '}{person.number}
        </li>
        </div> 
        )}
      </ul>
    </>
  )
}

export default Persons