import { Button, CardBody, Dialog, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import { downloadExcel } from "react-export-table-to-excel";
// import autoTable from 'jspdf-autotable';
import { db } from '../../../firebase';
import Allbookings from './Allbookings';
import { ToastContainer, toast } from 'react-toastify';

function Bookings() {
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

  React.useEffect(() => {
    db.collection("amount").doc(`JtXTonTljnEsuw8yHsL3`).onSnapshot((doc) => {
      setFinalAmount(doc.data());
    });
}, [])

  const handleModalOpen = (amount) => {
    setOpen(true);
    setFinalAmount(amount);  
  }

  useEffect(() => {
    db.collection('bookings').orderBy("timestamp","desc").onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()))
      })
}, [])

  useEffect(() => {
    db.collection('bookings')
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const postsData = snapshot.docs.map((doc) => doc.data());
        setPosts1(postsData);
        // Filter posts immediately after getting data
        filterPosts(postsData, searchTerm);
      });
  }, []);

  const filterPosts = (data, searchTerm) => {
    if (data && data.length > 0) {
      const finalPosts = data.filter((res) => {
        return res?.bookingID?.toString()?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      setFilteredPosts(finalPosts);
    } else {
      setFilteredPosts([]);
    }
  };

  const updateSearchResults = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Filter posts immediately when the search term changes
    filterPosts(posts1, newSearchTerm);
  };

  const updateAmount = () => {
    db.collection('amount').doc(`JtXTonTljnEsuw8yHsL3`).update({
      amount: finalAmount
    })
    setOpen(false)
    toast.success('Amount updated successfully!',{
      position: "top-center",
    })
  }


  return (
    <div>
    <div style={{display:'flex', alignItems:'center'}} className='gap-2 search-div'>
    <Input
    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    label="Search booking by ID..."
    color='orange'
    onChange={updateSearchResults}
  />
  <span><Button onClick={() => handleModalOpen(finalAmount?.amount)} color='orange' variant="outlined">Amount</Button></span>
    </div>

    <Allbookings filteredPosts={filteredPosts} searchTerm={searchTerm}/>


    <Dialog
    size="md"
    open={open}
    handler={() => setOpen(false)}
  >
  <CardBody>
  <ToastContainer />
  <Input
  type='number'
  color='orange'
  label='Amount'
  value={finalAmount}
  onChange={(e) => setFinalAmount(e.target.value)}
/>

<Button
color='orange'
style={{marginTop:10}}
onClick={updateAmount}
>
Update Amount
</Button>
  </CardBody>
  </Dialog>
    </div>
  )
}

export default Bookings