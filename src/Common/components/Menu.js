import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'


const Menu = () => {
  
  const state2 = useContext(UserContext)
  
  const {user, setUser} = state2
  
  return (
    <div className="row">
      <div className="col-12 m-auto mt-3 d-flex justify-content-center align-items-sm-baseline">
        <Link className="btn btn-info mr-3" to="/Login">Login</Link>
        <Link className="btn btn-info mr-3" to="/">Home</Link>
        <Link className="btn btn-info mr-3" to="/Tickets">Tickets</Link>
        <Link className="btn btn-info mr-3" to="/Messages">Mensajes</Link> 
        <p className="">Loged Ass:<span>{user}</span></p>
        <hr></hr>
      </div>
    </div>
  )
}

export default Menu