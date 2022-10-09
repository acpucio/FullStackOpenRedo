import React from 'react'

const Person = ({personId, name, number, deletePerson}) => {
    return (
        <li key={personId}>{name} {number}
        <button onClick={deletePerson}>delete</button></li>
    )
}

export default Person