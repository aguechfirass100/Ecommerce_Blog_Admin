import React from 'react'
import './landingPage.css'
import Header from '../../components/landingPageComponents/Header'
import Feature from '../../components/landingPageComponents/Feature'
import About from '../../components/landingPageComponents/About'
import Presentation from '../../components/landingPageComponents/Presentation'
import aboutimage1 from '../../images/Frame 19.png'
import aboutimage2 from '../../images/download.png'

const LandingPage = () => {


  return (
    <div className='App'>
        <Header />
        <Feature />
        <About 
            image={aboutimage1} 
            title='Build your Game with confidence and creativity'
            paragraph="Welcome to Alphtechlabs, a game development studio dedicated to crafting unforgettable gaming experiences. Our team of passionate developers and artists work together to bring imagination to life and create captivating worlds for players to explore. With a focus on innovation, quality, and player engagement, we strive to push the boundaries of gaming and deliver exceptional entertainment. Join us on this thrilling journey and embark on exciting adventures in the digital realm. Are you ready to level up?"
            // button='Download'
        />
        {/* <Presentation /> */}
        <About 
            image={aboutimage2} 
            title='Unleash Your Gaming Imagination with Alphtechlabs'
            paragraph="At Alphtechlabs, we are driven by a deep love for gaming and a commitment to delivering exceptional experiences to players worldwide. With a focus on innovation, creativity, and meticulous attention to detail, we strive to create games that captivate, inspire, and immerse. Our diverse team of talented individuals shares a common vision of crafting unforgettable worlds filled with thrilling challenges and engaging narratives. From action-packed adventures to thought-provoking puzzles, we pride ourselves on developing games that resonate with players of all ages and backgrounds. Join us on this exciting journey as we continue to push boundaries, embrace new technologies, and shape the future of gaming."
            // button='Download'
        />
    </div>
  )
}

export default LandingPage