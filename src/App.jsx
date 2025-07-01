import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import { ImageUploader } from './components/misc/ImageUploader'
import NotFound from './pages/error/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/upload' element={<ImageUploader/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App