import React from 'react'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    
    <Router>

      <Routes>

        <Route path='/register' element={<Register></Register>} />
        <Route path='/login' element={<Login/>} />

      </Routes>

    </Router>

  )
}

export default App