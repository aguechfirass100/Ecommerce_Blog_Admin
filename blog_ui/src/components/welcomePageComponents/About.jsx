import React from 'react';
import aboutimage from '../../images/about.png';

const About = () => {
  return (
    <div id='about'>
      <div className='about-image'>
        <img src={aboutimage} alt='about image' />
      </div>
      <div className='about-text'>
        <h1>LEARN MORE ABOUT US</h1>
        <p>Our video game, "Echoes of the Fallen: Carthage Legacy," is not just an entertaining experience, but also a captivating representation of a significant historical story. Immerse yourself in the rich narrative inspired by the ancient city of Carthage and its legacy. Explore pivotal moments, engage with compelling characters, and witness historical events come to life in stunning detail.</p>
        <button>Visit our Blog</button>
      </div>
    </div>
  );
}

export default About;
