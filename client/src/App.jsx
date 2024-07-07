import React from 'react'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    
    <Router>

      <Routes>

        <Route path='/register' element={<Register></Register>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />

      </Routes>

    </Router>

  )
}

export default App