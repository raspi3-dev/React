import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Menu from './Common/components/Menu'
import Messages from './ChatApp/Messages'
import Tickets from './Tickets/Tickets'
import NotFound from './Common/components/NotFound'
import Home from './Common/components/Home'


const App = () => {
  return (
    <div>
        <Menu />

        <Routes>
            <Route path="/Messages" element={ <Messages/> } />
            <Route path="/Tickets" element={ <Tickets/> } />
            <Route path="/" element={ <Home/> } />
            <Route path="*" element={ <NotFound/> } />
        </Routes>

    </div>
  )
}

export default App