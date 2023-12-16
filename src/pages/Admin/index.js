import Header from '../../components/Header'
import React from 'react'
import GroupIcon from '@mui/icons-material/Group';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import TotalCard from '../../components/TotalCard';
import Gallery from './Gallery';
import Bookings from './Bookings';
import Quotes from './Quotes';
import Reviews from './Reviews';
import Contact from './Contact';
import { auth, db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAuthId } from '../../redux/dataSlice';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Reset from './Reset';
import Team from './Team';

function Admin() {
  const [quotes, setQuotes] = React.useState([])
  const [bookings, setBookings] = React.useState([])
  const [albums, setAlbums] = React.useState([])
  const [reviews, setReviews] = React.useState([])
  const [contacts, setContacts] = React.useState([])
  const [team, setTeam] = React.useState([])
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false);

  const authId = useSelector((state) => state.authId)
  const dispatch = useDispatch()
  const history = useNavigate()


  React.useEffect(() => {
    db.collection('quotes').onSnapshot((snapshot) => {
      setQuotes(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('bookings').onSnapshot((snapshot) => {
      setBookings(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('albums').onSnapshot((snapshot) => {
      setAlbums(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('reviews').onSnapshot((snapshot) => {
      setReviews(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('contact-me').onSnapshot((snapshot) => {
      setContacts(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('team').onSnapshot((snapshot) => {
      setTeam(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  const logout = () => {
    auth.signOut();
    dispatch(updateAuthId(''))

    toast.success("Logged out successfully as Admin!",{
      position: "top-center",      
    })
}

const date = new Date;
let hours = date.getHours();

let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");


const login = (e)=> {
  e.preventDefault();
 setLoading(true)
 if(!email){
  toast.error('Please enter your email address!',{
    position: "top-center",
  })
  setLoading(false)
 }else if(!password){
  toast.error('Please enter your password!',{
    position: "top-center",
  })
  setLoading(false)
 }else{
  auth.signInWithEmailAndPassword(email,password)
  .then((auth) =>{
    setLoading(false)
    dispatch(updateAuthId(auth.user.uid))
    toast.success("Welcome back Admin.", {
      position: toast.POSITION.TOP_CENTER
    })
  })
  .catch((error) =>{
        // Handle errors
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          // Handle network errors (e.g., no internet connection)
          toast.error('Network error:', error.message, {
            position: toast.POSITION.TOP_CENTER
        })      
        setLoading(false) 
        } else if (error instanceof Error) {
          // Handle other errors
          toast.error('Error:', error.message, {
            position: toast.POSITION.TOP_CENTER
        })      
        setLoading(false) 
        } else {
          // If the error is a response from the API
          const errorMessage = error?.error?.message;
          const errorCode = error?.error?.code;
    
          if (errorMessage && errorCode) {
            toast.error('Error Message:', errorMessage, {
              position: toast.POSITION.TOP_CENTER
          })      
          setLoading(false) 
          } else {
            toast.error('Unknown error occurred', {
              position: toast.POSITION.TOP_CENTER
          })      
          setLoading(false) 
          }
        }    
  })
 }
}

  return (
    <div
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
        height:'10vh',
    }}
    >
    <Header />
    {authId ? (
      <>
      <div style={{background:'#fff', height:'100vh'}}>
      <div style={{display:'flex', alignItems:'center', padding:10, justifyContent:'space-between'}}>
       <div style={{fontSize:15, fontWeight:'bold'}}>{status}, Admin Yvan</div>
       <div><Button onClick={logout} variant="outlined" color='orange'>logout</Button></div>
      </div>
      <Card className='home'>
      <div className='cards'>    
      <TotalCard title='Bookings' number={bookings.length} icon={ConfirmationNumberIcon} />
      <TotalCard title='Quote Requests' number={quotes.length} icon={GroupIcon} />
      <TotalCard title='Albums' number={albums.length} icon={ConfirmationNumberIcon} />
   </div>
  
   <div className='cards'>
   <TotalCard title='Team' number={team.length} icon={GroupIcon} />
   <TotalCard title='Reviews' number={reviews.length} icon={SupervisedUserCircleIcon} />
   <TotalCard title='Contacts' number={contacts.length} icon={SupervisedUserCircleIcon} />
  </div>
  
  <Tabs style={{marginTop:15}} id="custom-animation" value={0}>
  <TabsHeader>
  <Tab key={0} value={0}>
  Bookings
  </Tab>
  <Tab key={1} value={1}>
  Quotes
  </Tab>
  <Tab key={2} value={2}>
  Albums
  </Tab>
  <Tab key={3} value={3}>
  Reviews
  </Tab>
  <Tab key={4} value={4}>
  Contact
  </Tab>
  <Tab key={5} value={5}>
  Team
  </Tab>
  </TabsHeader>
  <TabsBody
  animate={{
    initial: { y: 250 },
    mount: { y: 0 },
    unmount: { y: 250 },
  }}
  style={{background:'#fff', borderRadius:10}}
  >
  <TabPanel key={0} value={0}>
    <Bookings />
  </TabPanel>
  <TabPanel key={1} value={1}>
    <Quotes />
  </TabPanel>
  <TabPanel key={2} value={2}>
   <Gallery />
  </TabPanel>
  <TabPanel key={3} value={3}>
   <Reviews />
  </TabPanel>
  <TabPanel key={4} value={4}>
  <Contact />
  </TabPanel>
  <TabPanel key={5} value={5}>
  <Team />
  </TabPanel>
  </TabsBody>
  </Tabs>
      </Card>
      </div>
      </>
    ):(
      <center
      style={{
        paddingTop:80
      }}
      >
      <Card
      
      style={{
        border:'2px solid #F57500',
        width: "100%",
        margin: 1,
        maxWidth: 350,
    }}>
      <CardHeader
        variant="gradient"
        color="orange"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input 
        type='email'
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
        label="Email"
        color='orange'
        size="lg" />
        <Input
        type='password'
        onChange={(e)=> setPassword(e.target.value)}
        value={password}
        color='orange'
        label="Password" size="lg" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={login} variant="gradient" color='orange' fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          <Typography
            onClick={() => setOpen(true)}
            variant="small"
            color="orange"
            className="ml-1 font-bold cursor-pointer"
          >
            Forgotten password?
          </Typography>
        </Typography>
      </CardFooter>
    </Card>

    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
  >
    Signing in...<CircularProgress color="inherit" />
  </Backdrop>
      </center>
    )}


    <Dialog open={open} handler={() => setOpen(false)}
    size="sm" 
    >
    <DialogBody>
       <Reset setOpen={setOpen} />
    </DialogBody>
  </Dialog>
    </div>
  )
}

export default Admin