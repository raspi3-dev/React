import React from 'react'
import dades from '../Common/bd.json'

const Users = ({id}) => {
  const {users}=dades;


  const user=users.filter( (element) => {
    return element.id === id
  })[0]


  return (
    <td>{user.username}</td>
  )
}

export default Users