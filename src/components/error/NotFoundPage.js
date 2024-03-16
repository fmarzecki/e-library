import React from 'react'
import { Link } from 'react-router-dom'

// <a> sprawi ze cala strona sie odswiezy, i trzeba bedzie znowu ladowac caly html i javascript
// <Link> wyrenderuje tylko to co trzeba (Client side routing)


function NotFoundPage() {
  return (
    <div> 
        <h1> Nie znaleziono takiej strony :( </h1>
        <Link to="/"> Home </Link> 
        <a href="/"> Home (gorszy) </a>
    </div>
  )
}

export default NotFoundPage