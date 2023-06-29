import React from 'react'
import './UsersTable.css'

const UsersTableRows = ({user_name, user_number}) => {
  return (
    <>
    <tr>
            <td>{user_name}</td>
            <td>{user_number}</td>
            <td><input type="checkbox" /></td>
        </tr>
    </>
  )
}

export default UsersTableRows