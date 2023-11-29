import React from 'react'
import { motion } from 'framer-motion';
import { Breadcrumbs, Textarea } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { db } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import Review from './Review';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


function Reviews() {
  const [value1, setValue1] = React.useState(0);
  const [fullName, setFullName] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const reviewID = db.collection('reviews').doc().id
  const [reviews, setReviews] = React.useState([])
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    db.collection('reviews').orderBy("timestamp","desc").onSnapshot(snapshot => {
      setReviews(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);


  const sendReview = () => {
    setLoading(true)

    if(!fullName){
      toast.error('Please enter your full name!',{
        position: "top-center",
      })
      setLoading(false)
    }else if(!message){
      toast.error('Please enter your message!',{
        position: "top-center",
      })
      setLoading(false)
    }else if(value1 === 0){
      toast.error('Please rate with at least a star!',{
        position: "top-center",
      })
      setLoading(false)
    }else{
      setLoading(true)
      db.collection('reviews').doc(reviewID).set({
        fullName:fullName,
        message:message,
        timestamp:Date.now(),
        value:value1,
        reviewID
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Review sent successfully!',
          showConfirmButton: false,
          timer: 2000
        })
      })
      setLoading(false)
      setFullName('')
      setMessage('')
      setValue1(0)
      setOpen(false)
    }
  }

  const totalRatings = (reviews.reduce((a,v) =>  a = a + v.post.value , 0 ))
  const numberOfRatings = reviews.length
  const rating = totalRatings / numberOfRatings
  var a = Math.round(rating * 10) / 10
  var b = reviews.length

  const date = new Date;
let hours = date.getHours();
let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");

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
  <a style={{color:'#fff', fontWeight:'bold'}} href="/reviews">
    <span>{reviews.length} Review(s)</span>
  </a>
</Breadcrumbs>
  </div>


<center>
<Box
sx={{
  maxWidth: 200,
  display: 'block',
  alignItems: 'center',
  marginTop:8,
  width: '100%',
}}
>
 <div>
 <Button onClick={() => setOpen(true)} variant="gradient" color='orange'>
Add Review
</Button>
 </div>
 <div
 style={{marginTop:5, display:'flex', alignItems:'center'}}
 >
 <Rating
  name="text-feedback"
  value={a}
  readOnly
  precision={0.5}
  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
/><span>({numberOfRatings === 0 ?(<>0/5</>):(<>{a}/5</>)})</span>
<Box sx={{ ml: 2, fontSize:16, fontWeight:'bold', color:'#F57500' }}>{labels[a]}</Box>
 </div>
</Box>
</center>



<div
style={{
  display:'table',
  margin:'auto',
  marginLeft:0
}}
>
{reviews.length === 0 ? (
  <center style={{color:'#fff', marginTop:30}}>loading...</center>
  ):(
    <>
    {reviews.map(({id, post}) => (
      <Review 
      key={id}
      fullName={post.fullName}
      message={post.message}
      timestamp={post.timestamp}
      value={post.value}
      />
    ))}  
    </>
  )}
</div>

<Dialog open={open} handler={() => setOpen(false)}>
<DialogBody>
<ToastContainer />
<form className="w-full max-w-screen-lg">
<div className="mb-1 flex flex-col gap-6">
<Input
size="lg"
label="Full Name"
color="orange"
value={fullName}
 onChange={(e) => setFullName(e.target.value)}
/>


  <Textarea color="orange"
  placeholder={`${status}, we would love to hear from you!`}
  value={message}
   onChange={(e) => setMessage(e.target.value)}
  />

  <center style={{marginTop:-15}}>
<Rating
name="simple-controlled"
value={value1}
onChange={(event, newValue) => {
  setValue1(newValue);
}}
/>
</center>

</div>

<Button onClick={sendReview} className="mt-3" color="orange" fullWidth>
  {loading ? "Sending...": "Send Review"}
</Button>
</form>
</DialogBody>
<DialogFooter>
  <Button variant="gradient" color="red" onClick={() => setOpen(false)}>
    <span>Cancel</span>
  </Button>
</DialogFooter>
</Dialog>
  
  </div>
  )
}

export default Reviews