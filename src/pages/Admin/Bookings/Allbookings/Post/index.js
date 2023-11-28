import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { db } from '../../../../../firebase';
import { toast } from 'react-toastify';

function Post({ fullName, colID, bookingID, email, timestamp, number, phone, hours1, amount, selectedDateTime }) {
  const [loading, setLoading] = React.useState(false);


   const onDeleteBooking = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete booking: "${bookingID}"?`);
  
    if (!confirmDelete) {
      return;
    }
  
    setLoading(true);
  
    try {
       // Delete the album from Firestore
      await db.collection("bookings").doc(colID).delete();
  
      toast.success(`Booking "${bookingID}" deleted successfully!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Error deleting booking. Please try again.");
      setLoading(false);
    }
  };



  var t = new Date(selectedDateTime);
  var hours = t.getHours();
  var minutes = t.getMinutes();

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var formatted =
    t.toString().split(" ")[0] +
    ", " +
    ("0" + t.getDate()).slice(-2) +
    "/" +
    ("0" + (t.getMonth() + 1)).slice(-2) +
    "/" +
    t.getFullYear() +
    " - " +
    ("0" + t.getHours()).slice(-2) +
    ":" +
    ("0" + t.getMinutes()).slice(-2) +
    " ";

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell style={{fontWeight:'bold'}}> 
    {number}.         
    </TableCell>
    <TableCell align='right'>
    {bookingID}                   
    </TableCell>
    <TableCell align='right'>
    {fullName}                   
    </TableCell>
    <TableCell align='right'>
    <a style={{color:'#000'}} href={`mailto:${email}`} target='_blank'>{email}</a>
    </TableCell>
    <TableCell align='right'>
    <a style={{color:'#000'}} href={`tel:${phone}`} target='_blank'>{phone}</a>
    </TableCell>
    <TableCell align='right'>
    {hours1}                   
    </TableCell>
    <TableCell align='right'>
    {amount}                   
    </TableCell>
    <TableCell align='right'>
     {formatted}                   
    </TableCell>
    <TableCell align='right'>
    <DeleteForeverIcon onClick={onDeleteBooking} style={{color:'#F76D28', cursor: 'pointer'}}/>                               
    </TableCell>
    </TableRow>
  )
}

export default Post