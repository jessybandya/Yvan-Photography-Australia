
import React, { Fragment, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  DialogHeader,
  DialogBody,
  Input,
  Textarea,
  DialogFooter,
  Dialog as Dialog1,
  Spinner
} from "@material-tailwind/react";

import {
  BuildingStorefrontIcon,
  UserCircleIcon,
  HomeIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  MagnifyingGlassIcon,
  Bars2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Badge, Icon } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { headerLinks } from '../../assets/data'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, updateAuthId } from "../../redux/dataSlice";
import { auth, db } from "../../firebase";
import logo from '../../logo.svg'

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
 

function NavList() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {headerLinks.map((link, index) => (
         <>
         {isScrolled ? (
            <Typography
            key={index}
            as="a"
            href={`${link.link}`}
            variant="small"
            color="blue-gray"
            className="font-bold"
          >
          {currentRoute === link.link ? (
            <MenuItem style={{color:'#F57500',fontWeight:'bold'}} className="flex items-center gap-2 lg:rounded-full">
              {link.name}
            </MenuItem>
          ):(
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {link.name}
          </MenuItem>
          )}
          </Typography>
         ):(
            <Typography
            key={index}
            as="a"
            href={`${link.link}`}
            variant="small"
            color="white"
            className="font-bold"
          >
          {currentRoute === link.link ? (
            <MenuItem style={{color:'#F57500',fontWeight:'bold'}} className="flex items-center gap-2 lg:rounded-full">
              {link.name}
            </MenuItem>
          ):(
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {link.name}
          </MenuItem>
          )}
          </Typography>
         )}
         </>
      ))}

    </ul>
  );
}
 
export default function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authId);
  const cart = useSelector((state) => state.cart);
  const [openQuote, setOpenQuote] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const receiver = '+254700139636';
  const history = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const quoteID = db.collection('quotes').doc().id

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) {
        db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
      } else {
        // not logged in
      }
    });
  }, []);

  const submitQuote = () => {
    setLoading(true)

    if(!name){
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
      db.collection('quotes').doc(quoteID).set({
        fullName:name,
        email:email,
        phoneNumber:phoneNumber,
        message:message,
        timestamp:Date.now(),
        quoteID
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message sent successfully!',
        })
        sendViaEmail()
        setLoading(false)
        setName('')
        setEmail('')
        setPhoneNumber('')
        setMessage('')
        setOpenQuote(false)
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
      `Website Quote Form Submission From ${name}`
    );
    const body = encodeURIComponent(
      `Dear Admin,\n${message}\n\nFull Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}.`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.open(mailtoLink, "_blank");
  };
 
  const handleOpenQuote = () => setOpenQuote(!openQuote);
 
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const clearAllCartItems = () => {
    dispatch(clearCart());
    toast.warn(`Your cart has been cleared!`,{
      position: "top-center",
    })
    setOpenCartModal(false)
  }

 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

 
  return (
    <>
            {/* loader   */}
            <div style={{zIndex:99999999}} className="loader">
            <div className="loading-text-container "><span className="loading-text">Load<strong>ing</strong></span> <span className="loader_count">0</span></div>
            <div className="loader-anim" />
            <div className="loader-anim2 color-bg" />
          </div>
          {/* loader  end*/}
    <Navbar style={{width: '100%', zIndex:100}}
    className={`sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 ${
        isScrolled ? "" : "bg-transparent text-white border-none"
      }`}
    >
      <div style={{height:30}} className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          style={{display:'flex', alignItems:'center'}}
        >
        <img src="/media/images/yvan.png" style={{height:70}} alt="LensY logo"/>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        

        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

        <MenuHandler>
        <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
      />
      </MenuHandler>

    <Button onClick={() => setOpenQuote(true)} style={{background:'#F57500', marginRight:5}}>
    Quote    
    </Button>
      <a href="/booking">
      <Button className="blinking-button" 
      variant="filled" color="orange">
      Book    
      </Button>
      </a>
      </Menu>
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>





  <Dialog1 open={openQuote} handler={handleOpenQuote} onClose={() => setOpenQuote(false)}>
  <div className="flex items-center justify-between">
    <DialogHeader style={{color:'#F57500'}}>Quote Form</DialogHeader>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mr-3 h-5 w-5"
      onClick={handleOpenQuote}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  </div>
  <DialogBody divider>
  <ToastContainer />
    <div className="grid gap-6">
      <Input autoFocus={false} value={name} onChange={(e) => setName(e.target.value)} color="orange" label="Full Name" />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} color="orange" label="Email" type="email"/>
      <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} color="orange" label="Phone" />
      <Textarea value={message} onChange={(e) => setMessage(e.target.value)} color="orange" label="Message" />
    </div>

    <Button className="mt-10" fullWidth onClick={submitQuote} variant="gradient" color="orange">
    {loading ? 'Submitting...' : 'Submit'}
  </Button>
  </DialogBody>
</Dialog1>
    </>
  );
}