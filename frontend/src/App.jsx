import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/appointments' element={<MyAppointment />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:specialty' element={<Doctors />} />
        <Route path='/appointments/:docId' element={<Appointments />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App

