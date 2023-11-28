import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Avatar, Breadcrumbs, Button, Card, CardHeader, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TextField, styled } from '@mui/material';


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

function Booking() {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const bookingColID = db.collection('bookings').doc().id
  const [hours, setHours] = React.useState(0)
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs(Date.now()));
  const currentDateTime = dayjs(Date.now());
  const amount = hours * 200
  const bookingID = Math.floor(Math.random() * 1000000000)

  const convertToEpochTimestamp = (dateTime) => {
    const epochTimestamp = dateTime.unix();
    console.log('Epoch Timestamp:', epochTimestamp);
    // Use epochTimestamp as needed in your application logic
  };

  // Call the conversion function when the selectedDateTime changes
  React.useEffect(() => {
    convertToEpochTimestamp(selectedDateTime);
  }, [selectedDateTime]);

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);
  };

  const handleChangeHours=(e)=>{
    setHours(e);
 }

  const bookNow = () => {
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
    }else if(!hours){
      toast.error('Kindly select hours!',{
        position: "top-center",
      })
      setLoading(false)
    }else if(selectedDateTime < Date.now()){
        toast.error('Kindly select date & time!',{
          position: "top-center",
        })
        setLoading(false)
      }else{
      setLoading(true)
      db.collection('bookings').doc(bookingColID).set({
        bookingID,
        fullName:fullName,
        email:email,
        phoneNumber:phoneNumber,
        amount: hours * 200,
        hours,
        timestamp:Date.now(),
        bookingColID,
        selectedDateTime:selectedDateTime.toString()
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Your Booking was a success!',
          text: `Booking ID: ${bookingID}`,
          customClass: {
            container: "my-swal-container", // Add a custom CSS class name
          },
        })
        sendViaEmail()
        setLoading(false)
        setFullName('')
        setEmail('')
        setPhoneNumber('')
        setHours(0)
        setSelectedDateTime(dayjs(Date.now()))
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
      `Photography Booking Order ID: ${bookingID}`
    );
    const body = encodeURIComponent(
      `Booking ID: ${bookingID}\nHours: ${hours}\nSelected Date & Time: ${selectedDateTime}\nAmount(AUD): ${amount}\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}.`
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
  <center style={{color:'wheat', fontSize:20, fontWeight:'bold'}}><i>Book Now</i></center>
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

         <div style={{ position: 'relative', zIndex: 999 }}>
         <Select onChange={handleChangeHours}
         value={hours}
         label="Select Hours" style={{ color: '#fff' }} color="orange">
         <Option value={1}>1 Hours</Option>
         <Option value={1.5}>1.5 Hours</Option>
         <Option value={2}>2 Hours</Option>
         <Option value={2.5}>2.5 Hours</Option>
         <Option value={3}>3 Hours</Option>
         <Option value={3.5}>3.5 Hours</Option>
         <Option value={4}>4 Hours</Option>
         <Option value={4.5}>4.5 Hours</Option>
         <Option value={5}>5 Hours</Option>
         <Option value={5.5}>5.5 Hours</Option>
         <Option value={6}>6 Hours</Option>
         <Option value={6.5}>6.5 Hours</Option>
         <Option value={7}>7 Hours</Option>
         <Option value={7.5}>7.5 Hours</Option>
         <Option value={8}>8 Hours</Option>
         <Option value={8.5}>8.5 Hours</Option>
         <Option value={9}>9 Hours</Option>
         <Option value={9.5}>9.5 Hours</Option>
         <Option value={10}>10 Hours</Option>
         </Select>
         </div>
     
         <div style={{ position: 'relative', zIndex: 999, background:'#fff' }}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <MobileDateTimePicker
            // Gray text color for the input field
           value={selectedDateTime}
           onChange={handleDateTimeChange}
           renderInput={(props) => <Input color='orange' style={{color:'#fff'}} {...props} />} // Example: You can use TextField from MUI
           minDateTime={currentDateTime} // Disable dates and times less than current date and time
         />
       </LocalizationProvider>
       </div>
     
       </div>
       <CardHeader
       variant="gradient"
       color="gray"
       className="mt-5 grid h-18 place-items-center"
     >
       <Typography variant="h5" color="white">
         AUD {numberWithCommas(amount.toFixed(2))}
       </Typography>
     </CardHeader>
       <Button onClick={bookNow} className="mt-3" color="orange" fullWidth>
         {loading ? "Booking...": "Book Now"}
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
  </div>
  )
}

export default Booking