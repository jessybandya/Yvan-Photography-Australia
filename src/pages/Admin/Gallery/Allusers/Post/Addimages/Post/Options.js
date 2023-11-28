import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { Delete, Download, MoreVert } from '@mui/icons-material';
import {toast } from "react-toastify"
import { db, storage } from '../../../../../../../firebase';


export default function Options({ imageId, albumId, imageURL, images, image }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { currentUser, setAlert } = "";
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async (index) => {
    
  try {
    const updatedImages = [...images];
    const deletedImage = updatedImages.splice(index, 1)[0];

    // Delete the image from Firebase Storage
    const storageRef = storage.ref(`images/${albumId}`);
    const imageRef = storageRef.child(deletedImage.name);
    await imageRef.delete();

    // Update Firestore with the new array of images
    await db.collection("albums").doc(albumId).update({
      images: updatedImages,
    });

    toast.success("Image deleted successfully!",{
      position: toast.POSITION.TOP_CENTER
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    toast.error("Error deleting image. Please try again.");
  }
  };


  const onDownloadImage = async (image) => {
    try {
      const storageRef = storage.ref(`images/${albumId}`);
      const imageRef = storageRef.child(image.name);
  
      // Get the download URL for the image
      const downloadURL = await imageRef.getDownloadURL();
  
      // Create a temporary link element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadURL;
      downloadLink.download = image.name;
  
      // Append the link to the document and trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Error downloading image. Please try again.");
    }
  };
  

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              color: 'white',
              background: 'rgba(0,0,0,.3)',
            }}
          >
            <MoreVert fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => onDownloadImage(image)}>
          <ListItemIcon>
            <Download />
          </ListItemIcon>
          Download
        </MenuItem>
          <MenuItem onClick={() => handleDelete(imageId)}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
