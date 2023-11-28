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
  createData('Experience', '4+ Years'),
  createData('Awards', '15'),
  createData('Rate', '4.5/5'),
];

function About() {
  return (
    <div
    className="bg-cover bg-center h-full sm:h-screen"

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
  <center style={{color:'#F57500', fontSize:25, fontWeight:'bold', marginTop:8}}>Yvan Kulimushi</center>
  <center style={{color:'#fff', fontSize:15, marginTop:3}}><i>Hello, I'm Yvan, a passionate photographer based in Australia, capturing moments that resonate with life's beauty and essence.</i></center>
  <TableContainer style={{display:'table', margin:'auto', width: 450, marginTop:20, border:'2px solid #F57500', background:'transparent' }} component={Paper}>
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