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

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('Name', 'Yvan Kulimushi'),
  createData('Career', 'Professional Photographer'),
  createData('Email', 'yvan.kulimushi@gmail.com'),
  createData('Phone Number', '+61414973850'),
  createData('Location', 'Brisbane, Australia'),
  createData('Experience', '4+ Years'),
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
  <img src='/media/images/img-5.jpg' style={{width:150, height:150, borderRadius:75, border:'3px solid #F57500'}} />
  </center>
  <TableContainer style={{display:'table', margin:'auto', 
  width: '100%',
  maxWidth: 650, // Set maximum width to 350px
  marginTop:20, border:'2px solid #F57500', background:'transparent' }} component={Paper}>
  <Table aria-label="simple table">
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          style={{borderBottom:'2px solid #F57500'}}
        >
          <TableCell style={{fontWeight:'bold', color:'#F57500'}} component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell style={{color:'#fff'}} align="right">{row.calories}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  </div>
  <Footer />  
  </div>
  )
}

export default About