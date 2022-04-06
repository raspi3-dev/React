import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Menu from './Common/components/Menu'
import Messages from './ChatApp/Messages'
import Tickets from './Tickets/Tickets'
import NotFound from './Common/components/NotFound'
import Home from './Common/components/Home'
import Login from './Common/components/Login'
import { UserContext } from './UserContext'


const App = () => {
  
  const state = useState(null)
  const [user, setUser] = state
  
  return ( 
      <UserContext.Provider value={{user, setUser}}>
        <Menu />
        <Routes>
            <Route path="/Login" element={ <Login/> } />
            <Route path="/Messages" element={ user?<Messages/>:<Login/> } />
            <Route path="/Tickets" element={ user?<Tickets/>:<Login/> } />
            <Route path="/" element={ user?<Home/>: <Login/>} />
            <Route path="*" element={ <NotFound/> } />
        </Routes>
      </UserContext.Provider>
  )
}

export default App