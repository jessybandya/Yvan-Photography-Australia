import React from 'react'
import { motion } from 'framer-motion';
import { Breadcrumbs, Button } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Team from './Team';

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('Name', 'Yvan Kulimushi'),
  createData('Career', 'Professional Photographer'),
  createData('Email', 'yvan.kulimushi@gmail.com'),
  createData('Phone Number', '+61414973850'),
  createData('Speciality', 'Wedding, Portrait, Event, Family')  
];

function About() {
  return (
    <div
    className="bg-cover bg-center h-full sm:h-full"

    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
    }}
  >
  <Header />
  <div style={{paddingTop:10}}>
  <center
  >
  <img src='/media/images/yvan.png' style={{ height:150}} />
  </center>
  <div
  style={{
    color:'#fff',
    fontWeight:'bold',
    fontSize:15,
    padding:10,
  }}
  >
  Welcome to <span style={{color:'#F57500', fontStyle:'italic', fontSize:18}}>LensY Studio:</span><br/>
Embark on a journey where every click tells a captivating story. At Captured Essence, we're experts at capturing moments in time and making real and emotional pictures. Our enthusiastic team of photographers turns everyday events into unforgettable memories. We get to the heart of weddings, photos, events, and fine art by giving you personalised service, paying close attention to detail, and using cutting-edge technology. Your unique story is our canvas, and we can't wait to share it. Step into a world where we transform your memories into everlasting art.
  </div>

  <center 
  style={{
    color:'#F57500',
    fontWeight:'bold',
    fontSize:20,
    padding:10,
  }}
  >Meet Our Team</center>

   <Team />
  </div>
  <Footer />  
  </div>
  )
}

export default About