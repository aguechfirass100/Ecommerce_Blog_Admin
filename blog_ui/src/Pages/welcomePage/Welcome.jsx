import React from 'react'
import './welcome.css'
import Navbar from '../../components/welcomePageComponents/Navbar'
import Feature from '../../components/welcomePageComponents/Feature'
import Offer from '../../components/welcomePageComponents/Offer'
import About from '../../components/welcomePageComponents/About'
import Header from '../../components/welcomePageComponents/Header'


const Welcome = () => {

  return (
    <div className='App'>
      {/* <Navbar /> */}
      <Header />
      <Feature />
      <Offer />
      <About />
    </div>
  )
}

export default Welcome