import React from 'react'

function List() {

    const fruits = ['jabluszko', 'mandarynka', 'sliwka', 'banan'];

    const listFruits = fruits.reverse().map(fruit => {
        return <li> {fruit} </li>
    });

    const fruitsObjects = [
        {name: "jabluszko", calories: 90},
        {name: "mandarynka", calories: 100},
        {name: "sliwka", calories: 100},
        {name: "banan", calories: 100},
    ]

    fruitsObjects.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    fruitsObjects.sort((a,b) => a.calories - b.calories)

    const listFruitsObject = fruitsObjects.map(fruit => {
        return (
        <li key={fruit.name}> {fruit.name} : {fruit.calories} </li> 
        )
    })

  return (
    <ul> {listFruitsObject} </ul>
  )
}

export default List