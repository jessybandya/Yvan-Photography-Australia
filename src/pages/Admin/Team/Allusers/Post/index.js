import { Backdrop, CircularProgress, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Avatar,
} from "@material-tailwind/react";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { db, storage } from '../../../../../firebase';


function Post({ fullName, email, phone, timestamp, uid, profilePhoto, role }) {
  const [fullNameUpdate, setFullNameUpdate] = useState('')
  const [roleUpdate, setRoleUpdate] = useState('')
  const [phoneUpdate, setPhoneUpdate] = useState('')
  const [emailUpdate, setEmailUpdate] = useState('')
  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [profilePhoto1, setProfilePhoto1] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);


  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);

  const openModal = (fullName, role, phone, email) => {
    setFullNameUpdate(fullName)
    setRoleUpdate(role)
    setPhoneUpdate(phone)
    setEmailUpdate(email)
    setOpen(true)
  }

  const updateFun = () => {
    setLoading(true)
    db.collection('team').doc(uid).update({
      fullName: fullNameUpdate,
      email: emailUpdate,
      phone: phoneUpdate,
      role:roleUpdate,
    })
    toast.success(`Updated successfully!`, {
      position: "top-center",
      })
      setLoading(false)
  }

  const removeTeamMember = () =>{
    if(window.confirm(`Are you sure you want to delete ${fullName}`)){
        db.collection("team").doc(uid).delete().then(function() {
        }).catch(function(error) {
            toast.error("Error removing member: ", error);
        }); 
        toast.success(`${fullName} has been removed successfully!`,{
          position: "bottom-center",
        })   
      }
  }


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto1(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleClose = () => {
    setProfilePhoto1(null);
    setPreviewImage(null);
  };

  const handlePhotoUpload = () => {
    handleOpenBackdrop()
    const storageRef = storage.ref(`profile_photos/${uid}`);
    const uploadTask = storageRef.put(profilePhoto1);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        toast.error(`Error uploading profile photo:', ${error}`, {
          position : 'top-center'
        })
        handleCloseBackdrop()
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection('team').doc(uid).update({ profilePhoto: downloadURL });
          handleClose();
          handleCloseBackdrop()
          Swal.fire({
            icon: 'success',
            title: 'Profile photo updated',
            text: 'Your profile photo has been updated successfully!',
            customClass: {
              container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
            }
          })
        })
      }
    );
  };

  // const entryFun = () => {
  //   setLoading(true)
  //   db.collection('registration').doc(uid).update({
  //     checkedIn: true
  //   })
  //   toast.success(`Entry updated successfully for ${firstName} ${lastName}`, {
  //     position: "top-center",
  //     })
  //     setLoading(false)
  // }

  // const sendEmail = () => {
  //   setLoading(true)
  //   db.collection('registration').doc(uid).update({
  //     receivedEmail: true
  //   })
  //   sendViaEmail()
  //   toast.success(`Email has been sent to ${firstName} - Position: ${pos}`, {
  //     position: "top-center",
  //     })
  //     setLoading(false)
  // }



  // const sendViaEmail = async () => {
  //   const recipientEmail = email;
  //   var d = timestamp;
  //   //var d =val.timestamp;

  //   //NB: use + before variable name
  //   var date = new Date(+d);
  //   const cost = amount === 100 ? "Ordinary" : "VIP";
  //   const subject = encodeURIComponent(
  //     `Mr/Miss UoN 2023 Ticket Number: ${ticketID} - ${firstName} ${lastName}`
  //   );
  //   const body = encodeURIComponent(
  //     `Greetings ${firstName}, hope this mail finds you in good health. We've sent this mail to confirm to you that the registration for Mr/Miss UoN 2023 is a success. Below are the details for your booking.\n\nTicket Number: ${ticketID}\nList Position: ${pos}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nRegistration No.: ${regNo}\nPhone No.: ${phone}\nFaculty: ${faculty}\nCountry: ${country}\nAmount(KES): ${amount}.00\nType: ${cost}\nDate Registered: ${date.toDateString()}\n\nRegards,\nUwimana Jessy Bandya\nInternational Rep. Faculty Of Engineering.`
  //   );

  //   const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

  //   window.open(mailtoLink, "_blank");
  // };


  return (
    <>
        <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell> 
         <Avatar onClick={() => setOpenProfile(true)} src={profilePhoto} alt="Profile" style={{cursor:'pointer'}}/>         
        </TableCell>
        <TableCell align='right'>
        {fullName}                   
        </TableCell>
        <TableCell align='right'>
        {role}                   
        </TableCell>
        <TableCell align='right'>
        <a style={{textDecoration: 'none'}} href={`tel: ${phone}`}>
        {phone}
        </a>                   
        </TableCell>

        <TableCell align='right'>
        <a href={`mailto: ${email}`}>
        {email}                  
        </a>
        </TableCell>
        <TableCell align='right'>
        <DeleteForeverIcon onClick={removeTeamMember} style={{color:'#F76D28', cursor: 'pointer', marginRight:8}}/>
         <EditIcon onClick={() => openModal(fullName, role, phone, email)} style={{color:'#F76D28', cursor: 'pointer'}}/>                
        </TableCell>
  </TableRow>

  <Dialog
  size="md"
  open={open}
  handler={() => setOpen(false)}
>
<Card className="mx-auto w-full">
<CardBody className="flex flex-col gap-4">
<ToastContainer />
  <Input
  value={fullNameUpdate}
  color='orange'
  onChange={(e) => setFullNameUpdate(e.target.value)}
  label="Full Name" size="lg" />

  <Input
  value={roleUpdate}
  color='orange'
  onChange={(e) => setRoleUpdate(e.target.value)}
  label="Role" size="lg" />

  <Input
  value={phoneUpdate}
  color='orange'
  onChange={(e) => setPhoneUpdate(e.target.value)}
  label="Phone" size="lg" />

  <Input
  value={emailUpdate}
  color='orange'
  onChange={(e) => setEmailUpdate(e.target.value)}
  label="Email" size="lg" />

  <Button onClick={updateFun} color='orange' variant="gradient"  fullWidth>
  {loading ? 'Updating...' : 'Update'}
</Button>
</CardBody>
</Card>
</Dialog>

<Dialog
size="sm"
open={openProfile}
handler={() => setOpenProfile(false)}

>
<Card className="mx-auto w-full">
<CardBody className="flex flex-col gap-4">
<ToastContainer />
<Input type='file' color='orange' onChange={handlePhotoChange}/>
<div
style={{
height:'250px',
overflowY:'auto'
}}
>
{previewImage ? (
 <img src={previewImage} alt="Preview" style={{height:'100%', display:'table', margin:'auto', marginTop:10}}/>
):(
<center>No Image has been selected!</center>
)}
</div>
<Button
color='orange'
variant='gradient'
onClick={handlePhotoUpload}
>
Upload
</Button>

 <Backdrop
 sx={{ color: '#fff', zIndex: 2000 }}
 open={openBackdrop}
>
 Uploading...<CircularProgress color="inherit" />
</Backdrop>
</CardBody>
</Card>
</Dialog>
  </>
  )
}

export default Post