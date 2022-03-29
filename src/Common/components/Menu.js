import React from 'react'
import { Link } from 'react-router-dom'


const Menu = () => {
  return (
    <div className="row">
      <div className="col-5 m-auto mt-3 d-flex justify-content-center">
        <Link className="btn btn-info mr-3" to="/">Home</Link>
        <Link className="btn btn-info mr-3" to="/Tickets">Tickets</Link>
        <Link className="btn btn-info mr-3" to="/Messages">Mensajes</Link>
      </div>
    </div>
  )
}

export default Menu