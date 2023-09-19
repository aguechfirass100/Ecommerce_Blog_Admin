import React from 'react'
import Featurebox from './Featurebox'
import fimage1 from '../../images/1.png'
import fimage2 from '../../images/2.png'
import fimage3 from '../../images/3.png'
import fimage4 from '../../images/4.png'

const Feature = () => {

  return (
    <div id='features'>
        <h1>FEATURE</h1>
        <div className='a-container'>
            <Featurebox image={fimage1} title='Interactive Gameplay' description="Engage with thrilling and immersive gameplay that keeps players hooked for hours. Experience dynamic worlds, challenging missions, and a seamless gaming experience that keeps you on the edge of your seat."  />
            <Featurebox image={fimage2} title='Stunning Graphics' description="Immerse yourself in breathtaking visuals that bring the game world to life. Enjoy realistic environments, detailed character models, and stunning special effects that enhance the overall gaming experience."/>
            <Featurebox image={fimage3} title='Multiplayer Modes' description="Connect and compete with players from around the globe in thrilling multiplayer modes. Team up with friends or engage in intense PvP battles to test your skills and rise through the ranks. Experience the excitement of cooperative play or the thrill of competitive gaming."/>
            <Featurebox image={fimage4} title='Rich Storyline' description="Dive into a captivating narrative that unfolds as you progress through the game. Explore intricate story arcs, memorable characters, and unexpected plot twists that keep you engaged and invested in the game world. Experience a deep and immersive storytelling experience that adds depth to your gaming journey."/>
        </div>
    </div>
  )
}

export default Feature