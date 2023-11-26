import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';

function Nofound() {
  return (
    <div
    className="bg-cover bg-center h-screen"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
    }}
  >
  <Header />
  <center style={{marginTop:80}}
  >
  <div className="">
      <span style={{fontSize:25, color:'wheat',display:'flex', justifyContent:'center', alignItems:'center'}}>Error 404:<br/>We're sorry, but the Page you were looking for, couldn't be found.</span>    
    <div>
    <a href="/">
    <Button
    style={{background:'#F57500', marginTop:25}}>Go back to homepage</Button>
    </a>
</div>
   <div style={{marginTop:30}}>
   <Footer />
   </div>

  </div>
  </center>
  </div>
  )
}

export default Nofound