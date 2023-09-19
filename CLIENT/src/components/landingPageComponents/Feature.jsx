import React from 'react'
import Featurebox from './Featurebox'
import featureimage1 from '../../images/feature_1.png'
import featureimage2 from '../../images/feature_2.png'
import featureimage3 from '../../images/feature_3.png'


const Feature = () => {
  return (
    <div id='features'>
        <div className='a-container'>
            <Featurebox image={featureimage1} title='Development' description='We specialize in developing cutting-edge games that push the boundaries of technology and deliver immersive gameplay experiences.'/>
            <Featurebox image={featureimage2} title='Production' description='Our talented production team ensures the seamless integration of art, sound, and design elements, bringing our games to life with meticulous attention to detail.'/>
            <Featurebox image={featureimage3} title='Marketing' description='Through strategic marketing campaigns, we promote our games to a global audience, creating buzz and excitement to engage players from around the world.'/>
        </div>
    </div>
  )
}

export default Feature