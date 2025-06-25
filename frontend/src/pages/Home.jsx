import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/specialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
const home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      
      {/* Add more components as needed */}
      {/* <Footer /> */}
    </div>
  )
}

export default home
