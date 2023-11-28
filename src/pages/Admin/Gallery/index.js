import { Button, Dialog, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import { downloadExcel } from "react-export-table-to-excel";
// import autoTable from 'jspdf-autotable';
import Allusers from './Allusers';
import Addalbum from './Addalbum';
import { db } from '../../../firebase';

function Gallery() {
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    db.collection('albums').orderBy("timestamp","desc").onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()))
      })
}, [])

  useEffect(() => {
    db.collection('albums')
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
        return res?.name?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
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
    doc.text(`Albums List`, 20, 10);
    const columns = [
        "No.",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Date Registered",
    ];
    const rows = [];
    posts.map((item, i) =>
      rows.push([
        i+1,
        item.firstName,
        item.lastName,
        item.email,
        item.phone,
        timestampDate(item.timestamp),
      ])
    );
    doc?.autoTable(columns, rows);
    doc?.save(`Albums List`);
  }



    const header = [   
        "No.",   
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Date Registered",
];


    const downloadExcelFile = () => {
        downloadExcel({
          fileName: "Albums List",
          sheet: "Data",
          tablePayload: {
            header,
            // accept two different data structures
            body: posts.map((item, i) => [
                i+1,
                item.firstName,
                item.lastName,
                item.email,
                item.phone,
                timestampDate(item.timestamp),
            ])
          },
        });
    }
  return (
    <div>
    <div style={{display:'flex', alignItems:'center'}} className='gap-2 search-div'>
    <Input
    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    label="Search album name..."
    color='blue'
    onChange={updateSearchResults}
  />
  <span><Button onClick={() => setOpen(true)} color='orange' variant="outlined">Add</Button></span>
    </div>


    <Dialog
    size="md"
    open={open}
    handler={() => setOpen(false)}
  >
  <Addalbum setModalShow={setOpen}/>
  </Dialog>
    <Allusers filteredPosts={filteredPosts} searchTerm={searchTerm}/>
    </div>
  )
}

export default Gallery