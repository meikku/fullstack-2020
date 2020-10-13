import React from 'react'

const Persons = ( {persons, newQuery} ) => {

  const personsToShow = !newQuery
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newQuery.toLowerCase()))

  return (
    <div>
        <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name}{' '}{person.number}</li>
        )}
      </ul>
    
    </div>
  )
}

export default Persons