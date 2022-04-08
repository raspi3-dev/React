import React from 'react'
import dades from '../Common/bd.json'

const Users = ({id}) => {
  const {users}=dades;


  const userName=users.filter( (element) => {
    return element.id === id
  })[0]


  console.log(userName)
  
  return (
    <td>{userName.username}</td>
  )
}

export default Users