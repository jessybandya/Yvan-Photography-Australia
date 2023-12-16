import React from 'react'
import { motion } from 'framer-motion';
import { Avatar, Breadcrumbs, Button, Card, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { toast } from 'react-toastify';
import { db } from '../../firebase';

const AustraliaPlaces = [
  'Adelaide',
  'Albany',
  'Alice Springs',
  'Armidale',
  'Ballarat',
  'Bathurst',
  'Bendigo',
  'Blue Mountains',
  'Brisbane',
  'Broken Hill',
  'Broome',
  'Bunbury',
  'Bundaberg',
  'Burnie',
  'Cairns',
  'Canberra',
  'Coffs Harbour',
  'Darwin',
  'Devonport',
  'Dubbo',
  'Geelong',
  'Geraldton',
  'Gladstone',
  'Gold Coast',
  'Goulburn',
  'Hervey Bay',
  'Hobart',
  'Kalgoorlie-Boulder',
  'Karratha',
  'Launceston',
  'Lismore',
  'Mackay',
  'Maitland',
  'Melbourne',
  'Mildura',
  'Mount Gambier',
  'Newcastle',
  'Orange',
  'Perth',
  'Port Augusta',
  'Port Hedland',
  'Port Lincoln',
  'Rockhampton',
  'Sunshine Coast',
  'Sydney',
  'Tamworth',
  'Toowoomba',
  'Townsville',
  'Wagga Wagga',
  'Warrnambool',
  'Wollongong',
  // Add more places as needed
];

// Sort the places alphabetically
const sortedPlaces = AustraliaPlaces.sort();

function Contact() {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const contactMeID = db.collection('contact-me').doc().id
  const [address, setAddress] = React.useState('')

  const handleChangeAddress = (selectedAddress) => {
    setAddress(selectedAddress);
    // Handle selected address logic here
  };

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
    }else if(!address){
      toast.error('Please enter your address!',{
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
        address:address,
        contactMeID
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message sent successfully!',
        })
        sendViaEmail()
        setLoading(false)
        setFullName('')
        setEmail('')
        setPhoneNumber('')
        setMessage('')
        setAddress('')
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
    className="bg-cover bg-center h-full sm:h-full"

    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
    }}
  >
  <Header />
  <Card color="transparent" shadow={false} style={{paddingTop:30, borderRadius:10}}>
  <center style={{color:'wheat', fontSize:20, fontWeight:'bold'}}><i>Contact Me</i></center>
  <div style={{display:'flex',justifyContent:'center', padding:10}}>
     <div>
       <div style={{marginLeft:20, display:'table', margin:'auto'}}>
       <form className="mt-1 mb-2 w-full max-w-screen-lg sm:w-96">
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

         <div style={{  zIndex: 999 }}>
         <Select
         onChange={handleChangeAddress}
         value={address}
         label="Select your address..."
         style={{ color: '#fff' }}
         color="orange"
       >
       <Option >
</Option>
       <Option >
     </Option>
     <Option >
     </Option>

         {sortedPlaces.map((place) => (
           <Option  key={place} value={place}>
             {place}
           </Option>
         ))}
       </Select>
         </div>
     
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
     </div>
  </div>


</Card>
<Footer />
  </div>
  )
}

export default Contact