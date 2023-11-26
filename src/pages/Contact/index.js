import React from 'react'
import { motion } from 'framer-motion';
import { Breadcrumbs, Button } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';

function Contact() {
  return (
    <div
    className="bg-cover bg-center"

    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
        height:'60vh'
    }}
  >
  <Header />
  <div style={{paddingTop:100,    
display:'table',
  margin:'auto'}}
  >
  <Breadcrumbs
  style={{
     background:'#F57500',
  }}
  >
  <a href="/" style={{color:'#fff'}} className="opacity-60">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  </a>
  <a style={{color:'#fff', fontWeight:'bold'}} href="/contact-me">
    <span>Contact Me</span>
  </a>
</Breadcrumbs>
  </div>




  
  </div>
  )
}

export default Contact