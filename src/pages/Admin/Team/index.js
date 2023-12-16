import { Button, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import { downloadExcel } from "react-export-table-to-excel";
import autoTable from 'jspdf-autotable';
import Allusers from './Allusers';
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import Addmembers from './Addmember';
import { db } from '../../../firebase';

function Team() {
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    db.collection('team').orderBy("timestamp","desc").onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()))
      })
}, [])

  useEffect(() => {
    db.collection('team')
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
        return res?.fullName?.toString()?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
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


  const timestampDate = (t) => { 
    //NB: use + before variable name
    var date = new Date(+t);

    return date.toDateString()
  }


  const downloadPDF = () => {
    
    const doc = new jsPDF();
    doc.text(`LensY Team Members`, 20, 10);
    const columns = [
        "No.",
      "Full Name",
      "Email",
      "Phone",
      "Date Registered",
    ];
    const rows = [];
    posts.map((item, i) =>
      rows.push([
        i+1,
        item.fullName,
        item.email,
        item.phone,
        timestampDate(item.timestamp),
      ])
    );
    doc?.autoTable(columns, rows);
    doc?.save(`LensY Team Members`);
  }

  return (
    <div>
    <div style={{display:'flex', alignItems:'center'}} className='gap-2 search-div'>
    <Input
    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    label="Search full name..."
    color='blue'
    onChange={updateSearchResults}
  />
  <span><Button onClick={downloadPDF} color='red' variant="outlined">PDF</Button></span>
  <span><Button onClick={() => setOpen(true)} color='orange' variant="outlined">Add</Button></span>
    </div>
    <Allusers filteredPosts={filteredPosts} searchTerm={searchTerm}/>

    
    <Dialog
    size="md"
    open={open}
    handler={() => setOpen(false)}
  >
  <Addmembers setOpen={setOpen}/>
  </Dialog>
    </div>
  )
}

export default Team