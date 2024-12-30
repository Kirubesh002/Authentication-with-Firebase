
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import Dashboard from './Pages/Dashboard/Dashboard'


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/registerPage' element={<RegisterPage/>}/>
      <Route path='/dashboard' element={ <Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    
      
     
    
    </>
  )
}

export default App
