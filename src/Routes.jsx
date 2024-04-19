import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Buy from './components/Buy'
import App from './App'
import Navbar from './components/Navbar'
const Routers = () => {
  return (<>
    {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/Buy'  element={<Buy/>}/>
         </Routes>
         </>
    
  )
}

export default Routers
