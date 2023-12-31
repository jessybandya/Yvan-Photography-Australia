import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Post from './Post'
import { db } from '../../../../firebase';


function Allusers({ filteredPosts, searchTerm }) {
      const [posts, setPosts] = React.useState([])
      const pageSize = 10; // Number of posts per page
      const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 5) : 1;
      });
    const [prevPage, setPrevPage] = useState(1);

      const totalPages = Math.ceil(posts.length / pageSize);
  
      React.useEffect(() => {
        const unsubscribe = db.collection('albums').orderBy("timestamp", "asc").onSnapshot(snapshot => {
            const posts = snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            }));
    
            if (posts.length > 1) {
                const [firstItem, ...rest] = posts;
                rest.sort((a, b) => b.post.timestamp - a.post.timestamp); // Sorting rest of the items by timestamp
                const sortedPosts = [firstItem, ...rest]; // Combining the first item and the sorted rest
    
                setPosts(sortedPosts);
            } else {
                setPosts(posts);
            }
        });
    
        return () => unsubscribe();
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
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">ALBUM NAME</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">NO. IMAGES</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">VIEW</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">VISIBILITY</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">CODE</TableCell>
          <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #F76D28",color:"#F76D28"}} align="right">REGISTERED</TableCell>
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
                    name={post.name}
                    albumId={id}
                    images={post.images}
                    ownerId={post.ownerId}
                    timestamp={post.timestamp}
                    number={index+1}
                    visibility={post.visibility}
                    code = {post.code}
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
 name={posts2.name}
 albumId={posts2.albumId}
 images={posts2.images}
 ownerId={posts2.ownerId}
 timestamp={posts2.timestamp}
 number={index+1}
 visibility={posts2.visibility}
 code = {posts2.code}
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

export default Allusers