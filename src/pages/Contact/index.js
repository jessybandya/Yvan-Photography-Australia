import React from 'react'
import { motion } from 'framer-motion';
import { Avatar, Breadcrumbs, Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { toast } from 'react-toastify';
import { db } from '../../firebase';

function Contact() {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const contactMeID = db.collection('contact-me').doc().id

  const sendContactMessage = () => {
    setLoading(true)

    if(!fullName){
      toast.error('Please enter your full name!',{
        position: "top-center",
      })
      setLoading(false)
    }else if(!email){
      toast.error('Please enter your email address!',{
        position: "top-center",
      })
      setLoading(false)
    }else if(!phoneNumber){
      toast.error('Please enter your phone number!',{
        position: "top-center",
      })
      setLoading(false)
    }else if(!message){
      toast.error('Please enter your message!',{
        position: "top-center",
      })
      setLoading(false)
    }else{
      setLoading(true)
      db.collection('contact-me').doc(contactMeID).set({
        fullName:fullName,
        email:email,
        phoneNumber:phoneNumber,
        message:message,
        timestamp:Date.now(),
        contactMeID
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message sent successfully!',
          showConfirmButton: false,
          timer: 2000
        })
        sendViaEmail()
        setLoading(false)
        setFullName('')
        setEmail('')
        setPhoneNumber('')
        setMessage('')
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
        setLoading(false)
      })
    }
  }

  const sendViaEmail = async () => {
    const recipientEmail = 'yvan.kulimushi@gmail.com';
    const subject = encodeURIComponent(
      `Website Contact Me Form Submission From ${fullName}`
    );
    const body = encodeURIComponent(
      `Dear Admin,\n${message}\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}.`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.open(mailtoLink, "_blank");
  };
  const classes = "p-4";
  return (
    <div
    className="bg-cover bg-center h-full sm:h-screen"

    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
    }}
  >
  <Header />
  <Card color="transparent" shadow={false} style={{paddingTop:30, borderRadius:10}}>
  <center style={{color:'wheat', fontSize:20, fontWeight:'bold'}}><i>Contact Me</i></center>
  <div style={{display:'flex',justifyContent:'center', padding:10}}>
     <div style={{display:'flex', flexWrap:'wrap'}}>
       <div style={{marginLeft:20}}>
       <form className="mt-8 mb-2 w-96 max-w-screen-lg sm:w-96">
       <div className="mb-1 flex flex-col gap-6">
       <Input
       size="lg"
       label="Full Name"
       color="orange"
       style={{color:'#fff'}}
       value={fullName}
        onChange={(e) => setFullName(e.target.value)}
     />
         <Input
           size="lg"
           label="Email Address"
           color="orange"
           type='email'
           style={{color:'#fff'}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         /> 
         <Input
           size="lg"
           label="Phone Number"
           color="orange"
            style={{color:'#fff'}}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
         />
     
         <Textarea color="orange" label="Message"
         value={message}
         style={{color:'#fff'}}
          onChange={(e) => setMessage(e.target.value)}
         />
     
       </div>
     
       <Button onClick={sendContactMessage} className="mt-3" color="orange" fullWidth>
         {loading ? "Contacting...": "Contact Me"}
       </Button>
     </form>
       </div>
       <div style={{marginLeft:20, background:'#fff', height:350, borderRadius:10, padding:8}} className="mt-8 mb-2 w-96 max-w-screen-lg sm:w-96">
         <center><img src='/media/images/img-5.jpg' alt='Yvan' style={{height:150, width:150, borderRadius:75, border:'2px solid #F57500'}}/></center>
         <center style={{fontSize:18}}><b><i>Yvan Kulimushi</i></b></center>
         <br />
         <hr />
         <center style={{color:'#F57500', fontSize:18}}><b><i>Australia, Brisbane</i></b></center>
         <center className={classes}>
             <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
             <Typography
             variant="small"
             color="orange"
             className="font-normal"
           >
             <EmailIcon />
           </Typography>

           <Typography
           variant="small"
           color="orange"
           className="font-bold"
         >
           <a href="mailto:yvan.kulimushi@gmail.com" target='_blank'>
           yvan.kulimushi@gmail.com
           </a>
         </Typography>
             </div>
         </center>

         <center className={classes}>
         <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:-50}}>
         <Typography
         variant="small"
         color="orange"
         className="font-normal"
       >
         <LocalPhoneIcon />
       </Typography>

       <Typography
       variant="small"
       color="orange"
       className="font-bold"
     >
       <a href="tel:+61414973850">
       +61414973850
       </a>
     </Typography>
         </div>
     </center>
       </div>
     </div>
  </div>


</Card>
<Footer />
  </div>
  )
}

export default Contact