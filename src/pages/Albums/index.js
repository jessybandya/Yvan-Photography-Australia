import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Breadcrumbs, Button } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import { db } from '../../firebase';
import { ImageList } from '@mui/material';
import Post from './Post';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Albums() {
  const [posts, setPosts] = React.useState([])
  const pageSize = 10; // Number of posts per page
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 5) : 1;
  });
const [prevPage, setPrevPage] = useState(1);

  const totalPages = Math.ceil(posts.length / pageSize);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

   React.useEffect(() => {
       db.collection('albums').orderBy("timestamp","asc").onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);

// Handle page change
const handlePageChange = (event, page) => {
setCurrentPage(page);
};

// Save the currentPage to localStorage when it changes
useEffect(() => {
  localStorage.setItem("currentPage", currentPage);
}, [currentPage]);

// Get the posts for the current page
const getCurrentPosts = () => {
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
return posts.slice(startIndex, endIndex);
};

useEffect(() => {
// Save the current page before updating the data
setPrevPage(currentPage);
}, [posts]);

useEffect(() => {
// Set the current page back to its previous value after data update
setCurrentPage(prevPage);
}, [prevPage]);
  return (
    <div
    className="bg-cover bg-center"

    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
        height:'35vh'
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
  <a style={{color:'#fff', fontWeight:'bold'}} href="/albums">
    <span>Albums</span>
  </a>
</Breadcrumbs>
  </div>

  <div style={{marginTop:25, display:'flex', alignItems:'center', flexWrap:'wrap', justifyContent:'center'}}>

  {
    posts?.length > 0 ?(
      <>
      {
         getCurrentPosts().map(({id, post}) => (
             <Post
             key={id} 
             albumId={id}
             images={post.images}
             name={post.name}
             timestamp={post.timestamp}
             ownerId={post.ownerId}
             visibility={post.visibility}
             code = {post.code}
             />
           ))
}
      </>
   ):(
    <Backdrop
    sx={{ color: '#fff', zIndex: 99999 }}
    open={open}
  >
    loading...<CircularProgress color="inherit" />
  </Backdrop>
   )
  }

  </div>


  
  </div>
  )
}

export default Albums