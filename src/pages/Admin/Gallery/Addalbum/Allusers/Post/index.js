import { Button, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Addimages from './Addimages';
import { Card, CardBody, Input, Button as TailwindButton, Dialog as TailwindDialog } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase'
import { storage, db } from '../../../../../../firebase';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Post({ name, albumId, images, ownerId, timestamp, number }) {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
 const [loading, setLoading] = useState(false)
 const [selectedImages, setSelectedImages] = useState([]);




 const handleRemoveImage = (index) => {
  const updatedImages = [...selectedImages];
  const removedImage = updatedImages.splice(index, 1)[0];
  setSelectedImages(updatedImages);
  URL.revokeObjectURL(removedImage.preview);
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);

  // const openModal = (firstName, lastName, phone) => {
  //   setFirstNameUpdate(firstName)
  //   setLastNameUpdate(lastName)
  //   setPhoneUpdate(phone)
  //   setOpen(true)
  // }

  // const updateFun = () => {
  //   setLoading(true)
  //   db.collection('users').doc(uid).update({
  //     firstName: firstNameUpdate,
  //     lastName: lastNameUpdate,
  //     phone: phoneUpdate,
  //   })
  //   toast.success(`Member has been updated successfully!`, {
  //     position: "top-center",
  //     })
  //     setLoading(false)
  // }

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


  const onUpload = async () => {
    setLoading(true);
  
    if (!selectedImages || selectedImages.length === 0) {
      toast.error("Kindly add at least one image!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    } else {
      try {
        setLoading(true);
  
        const storageRef = storage.ref(`images/${albumId}`);
  
        const promises = selectedImages.map(async (file) => {
          const fileRef = storageRef.child(file.name);
          await fileRef.put(file);
          
          const downloadURL = await fileRef.getDownloadURL();
  
          return {
            name: file.name,
            url: downloadURL,
            timestamp: Date.now(),
            comment: name,
          };
        });
  
        const uploadedImages = await Promise.all(promises);
  
        // Update Firestore with the array of uploaded images
        db.collection("albums").doc(albumId).update({
          images: firebase.firestore.FieldValue.arrayUnion(...uploadedImages),
        });
  
        toast.success("Successfully uploaded photos!",{
          position: toast.POSITION.TOP_CENTER,
        });
        setSelectedImages([]);
        setOpenDialog(false);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Error uploading images. Please try again.");
        setLoading(false);
      }
    }
  };


  const onDeleteAlbum = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete album "${name}"?`);
  
    if (!confirmDelete) {
      return;
    }
  
    setLoading(true);
  
    try {
      // Retrieve the images from Firestore
      const albumDoc = await db.collection("albums").doc(albumId).get();
      const albumData = albumDoc.data();
  
      // Delete each image from Firebase Storage
      const storageRef = storage.ref(`images/${albumId}`);
      const deleteImagePromises = albumData.images.map(async (image) => {
        const imageRef = storageRef.child(image.name);
        await imageRef.delete();
      });
  
      // Wait for all image deletions to complete
      await Promise.all(deleteImagePromises);
  
      // Delete the album from Firestore
      await db.collection("albums").doc(albumId).delete();
  
      toast.success(`Album "${name}" deleted successfully!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Error deleting album. Please try again.");
      setLoading(false);
    }
  };
  

  return (
        <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell style={{fontWeight:'bold'}}> 
        {number}.         
        </TableCell>
        <TableCell align='right'>
        {name}                   
        </TableCell>
        <TableCell align='right'>
        {images.length}                   
        </TableCell>
        <TableCell align='right'>
         <RemoveRedEyeIcon onClick={handleClickOpen} style={{color:'#00FF00', cursor: 'pointer'}}/>                  
        </TableCell>
        <TableCell align='right'>
        {date.toDateString()}                 
        </TableCell>
        <TableCell align='right'>
         <DeleteForeverIcon onClick={onDeleteAlbum} style={{color:'#00FF00', cursor: 'pointer'}}/>                
        </TableCell>

        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ zIndex: 1000}}
      >
        <AppBar style={{background: '#00A300'}} sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {name}
            </Typography>

          </Toolbar>
        </AppBar>
        <List>
        <center><TailwindButton onClick={() => setOpenDialog(true)} variant='outlined' color='orange'>Upload Images</TailwindButton></center>
         <div style={{marginTop:5}}>
         <Addimages albumId={albumId}/>
         </div>
        </List>
      </Dialog>


      <TailwindDialog
      size="lg"
      open={openDialog}
      handler={() => setOpenDialog(false)}
    >
    <Card className="mx-auto w-full">
    <CardBody className="flex flex-col gap-4">
    <ToastContainer />
      <Input
      color='green'
      type='file'
      label="Upload Images" size="lg"
      multiple
      onChange={(e) => setSelectedImages(Array.from(e.target.files))}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {selectedImages.length === 0 ?(
        <center style={{fontSize:15}}><i>No Image!</i></center>
      ):(
        <>
        {selectedImages.map((image, index) => (
          <span key={index}>
            <img
              onClick={() => handleRemoveImage(index)}
              src={URL.createObjectURL(image)}
              alt={image.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '5px', cursor:'pointer' }}
            />
          </span>
        ))}
        </>
      )}
    </div>

      <TailwindButton onClick={onUpload} color='green' variant="gradient"  fullWidth>
      {loading ? 'Uploading...' : 'Upload'}
    </TailwindButton>
    </CardBody>
  </Card>
    </TailwindDialog>
  </TableRow>
  )
}

export default Post