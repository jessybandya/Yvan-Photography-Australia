import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import { Button, Card, CardBody, Input } from '@material-tailwind/react'
import { db, storage } from '../../../../firebase';
import firebase from 'firebase';


function Addalbum({ setModalShow }) {
    const theme = createTheme();
    const [albumName, setAlbumName] = useState("");
    const history = useNavigate("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false)





    const handleRemoveImage = (index) => {
     const updatedImages = [...selectedImages];
     const removedImage = updatedImages.splice(index, 1)[0];
     setSelectedImages(updatedImages);
     URL.revokeObjectURL(removedImage.preview);
   };

    const onAlbumNameChange = (e) => {
        setAlbumName(e.target.value);
      };
  


      const onUpload = async () => {
        setLoading(true);
        const albumId = db.collection('albums').doc().id

      
        if (!albumName) {
          toast.error("Album Name is required!", {
            position: toast.POSITION.TOP_CENTER,          
          })
            setLoading(false)
        }else if (!selectedImages || selectedImages.length === 0) {
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
                comment: albumName,
              };
            });
      
            const uploadedImages = await Promise.all(promises);
      
            // Update Firestore with the array of uploaded images
            db.collection("albums").doc(albumId).set({
              images: firebase.firestore.FieldValue.arrayUnion(...uploadedImages),
              timestamp: Date.now(),
              name: albumName,
              albumId: albumId,
            });
      
            toast.success("Successfully uploaded photos!",{
              position: toast.POSITION.TOP_CENTER,
            });
            setSelectedImages([]);
            setModalShow(false);
            setLoading(false);
          } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("Error uploading images. Please try again.");
            setLoading(false);
          }
        }
      };

  return (
    <Card className="mx-auto w-full">
    <CardBody className="flex flex-col gap-4">
    <ToastContainer />

           <center>
         <Typography component="h5" variant="h5">
           <i>Add Album</i>
         </Typography>
           </center>
          <Input
            color="orange"
            fullWidth
            id="text"
            label="Create Album Name"
            value={albumName} onChange={onAlbumNameChange}
          /> 

          <Input
          color='orange'
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onUpload}
            color='orange'
          >
            {loading ? 'Creating...' : 'Create Album'}
          </Button>

    </CardBody>
  </Card>
  )
}

export default Addalbum