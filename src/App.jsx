import { useState } from 'react'
//import {}
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './utils/ProtectedRoute'
import LoginPage from './pages/LoginPage'

import constants from './constants/constants'
import axios from 'axios'

function App() {
  const [usuario, setUsuario] = useState(null);

  //async function login(params) {
  //  const ans = await axios.post(constants.URL_BACKEND+"/login", usuario)
  //}

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage usuarioRegistrado={usuario} setUsuarioRegistrado={setUsuario}/>}></Route>
        <Route path="/*" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<div>hola</div>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
