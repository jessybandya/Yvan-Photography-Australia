import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { homeImgages } from '../../assets/data';

function Home() {
  return (
    <>
    <div
    className="bg-cover bg-center h-screen"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
    }}
  >
  <Header />
  <motion.div
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
    <h1>Yvan Photography <br /><span> Based in Australia, Brisbane.</span></h1>
    <h4>Embrace the artistry and elegance of photography. Yvan's vision brings forth a world of grace and sophistication, inviting you to see through a lens that reveals the extraordinary in the ordinary.</h4>
    <div className="clearfix" />
    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
    {homeImgages.map((item) => (
      <ImageListItem key={item.name} className="image-list-item"
      >
      <img
      srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
      alt={item.name}
      loading="lazy"
      style={{height:150, width:150, border:'1px #F57500 solid'}}
    />
      <i>
      <ImageListItemBar
      style={{color:'#F57500'}}
        title={item.name}
      />
      </i>
      </ImageListItem>
    ))}
    </div>
  </div>
  </motion.div>
  </div>
  <Footer />
  </>
  )
}

export default Home