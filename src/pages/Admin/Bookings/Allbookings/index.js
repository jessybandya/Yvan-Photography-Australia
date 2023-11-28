import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Post from './Post'
import { db } from '../../../../firebase';


function Allbookings({ filteredPosts, searchTerm }) {
      const [posts, setPosts] = React.useState([])
      const pageSize = 10; // Number of posts per page
      const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 5) : 1;
      });
    const [prevPage, setPrevPage] = useState(1);

      const totalPages = Math.ceil(posts.length / pageSize);
  
       React.useEffect(() => {
           db.collection('bookings').orderBy("timestamp","desc").onSnapshot(snapshot => {
               setPosts(snapshot.docs.map(doc => ({
                   id: doc.id,
                   post: doc.data(),
               })));
           })
       }, []);
  
  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

    // Save the currentPage to localStorage when it changes
    useEffect(() => {
      localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

// Get the posts for the current page
const getCurrentPosts = () => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return posts.slice(startIndex, endIndex);
};

  useEffect(() => {
    // Save the current page before updating the data
    setPrevPage(currentPage);
  }, [posts]);

  useEffect(() => {
    // Set the current page back to its previous value after data update
    setCurrentPage(prevPage);
  }, [prevPage]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}}>No.</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">B. ID</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">F. NAME</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">EMAIL</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">PHONE</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">HOURS</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">AMOUNT</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">DATE & TIME</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {searchTerm === "" ?(
          posts?.length > 0 ?(
             <>
             {
                getCurrentPosts().map(({id, post}, index) => (
                    <Post
                    key={id} 
                    fullName={post.fullName}
                    colID={id}
                    bookingID={post.bookingID}
                    email={post.email}
                    timestamp={post.timestamp}
                    number={index+1}
                    phone={post.phoneNumber}
                    hours1={post.hours}
                    amount={post.amount}
                    selectedDateTime={post.selectedDateTime}                 
                    />
                  ))
  }
             </>
          ):(
            <div style={{display:'table',margin:'auto',fontSize:18}}>loading...</div>
          )
       ):(
        <>
        {
         filteredPosts.length > 0 ?(
           <>
           {
                           filteredPosts.map((posts2, index) => (
 
 <Post 
 fullName={posts2.fullName}
 colID={posts2?.bookingColID}
 bookingID={posts2.bookingID}
 email={posts2.email}
 timestamp={posts2.timestamp}
 number={index+1}
 phone={posts2.phoneNumber}
 hours1={posts2.hours}
 amount={posts2.amount}
 selectedDateTime={posts2.selectedDateTime}     
 />
 ))
                           }
           </>
         ):(
            <><center><h4>Not found...</h4></center></>
         )       
       
       }
        </>
       )}
        </TableBody>
      </Table>
    </TableContainer>

    <center style={{display:'table',margin:'auto',marginTop:5,marginBottom:5}}>
    <Pagination
    count={totalPages}
    page={currentPage}
    onChange={handlePageChange}
    variant="outlined"
    shape="rounded"
    color="primary"
  />
    </center>
  </Paper>
  )
}

export default Allbookings