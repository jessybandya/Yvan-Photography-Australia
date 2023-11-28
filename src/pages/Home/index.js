import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';

function Home() {
  return (
    <div
    className="bg-cover bg-center h-screen"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
    }}
  >
  <Header />
  <motion.div style={{marginTop:50}}
  initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
  >
  <div className="half-hero-wrap">
    <div className="hhw_header">
    <Typewriter
    options={{
        strings: ['Photographer', 'Photographer'],
        autoStart: true,
        loop: true,
        }}
        />
    </div>
    <h1>Hi, I am Yvan Kulimushi <br /><span> Based in Australia, Brisbane.</span></h1>
    <h4>Embrace the artistry and elegance of photography. Yvan's vision brings forth a world of grace and sophistication, inviting you to see through a lens that reveals the extraordinary in the ordinary.</h4>
    <div className="clearfix" />

    <a href='/albums'>
    <Button
    style={{background:'#F57500', marginTop:25}}>View My Portfolio</Button>
</a>
   <div style={{marginTop:50}}>
   <Footer />
   </div>

  </div>
  </motion.div>
  </div>
  )
}

export default Home