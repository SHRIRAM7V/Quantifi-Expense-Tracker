
import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom' 

import Dashboard from "./pages/DashBoard/Dashboard"
import Auth from "./pages/Auth/Auth"

function App() {
  return (
<Router>
  <div className='app-container'>
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/auth' element={<Auth/>}/>
  </Routes>
  </div>
</Router>
  )
}

export default App
