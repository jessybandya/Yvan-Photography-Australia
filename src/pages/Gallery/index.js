import React, { useEffect, useState } from 'react'
import Post from './Post';
import { db } from '../../firebase';

function Gallery() {
  const [posts, setPosts] = React.useState([])
  const pageSize = 10; // Number of posts per page
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 5) : 1;
  });
const [prevPage, setPrevPage] = useState(1);

  const totalPages = Math.ceil(posts.length / pageSize);

   React.useEffect(() => {
       db.collection('albums').orderBy("timestamp","asc").onSnapshot(snapshot => {
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
    <div>
        <div className="ttm-page-title-row">
          <div className="container">
            <div className="row">
              <div className="col-md-12"> 
                <div className="title-box text-left">
                  <div className="page-title-heading">
                    <h1 className="title">Our Gallery</h1>
                  </div>{/* /.page-title-captions */}
                  <div className="breadcrumb-wrapper">
                    <span>
                      <a title="Homepage" href="/"><i className="ti ti-home" />&nbsp;&nbsp;Home</a>
                    </span>
                    <span className="ttm-bread-sep ttm-textcolor-white">&nbsp;   →  &nbsp;</span>
                    <span className="ttm-textcolor-skincolor">Our Expert</span>
                  </div>  
                </div>
              </div>{/* /.col-md-12 */}  
            </div>{/* /.row */}  
          </div>{/* /.container */}                      
        </div>{/* page-title end*/}
        {/*site-main start*/}
        <div style={{marginTop:-30}} className="site-main">
          {/* services-section */}
          <section className="ttm-row grid-section clearfix">
            <div className="container">
              <div className="row" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>{/* row */}

              {
                posts?.length > 0 ?(
                  <>
                  {
                     getCurrentPosts().map(({id, post}) => (
                         <Post
                         key={id} 
                         albumId={id}
                         images={post.images}
                         name={post.name}
                         timestamp={post.timestamp}
                         ownerId={post.ownerId}
                         />
                       ))
       }
                  </>
               ):(
                 <div style={{display:'table',margin:'auto',fontSize:18}}>loading...</div>
               )
              }

              </div>
              {/* row end */}
            </div>
          </section>
          {/* services-section end */}
        </div>{/*site-main end*/}
      </div>
  )
}

export default Gallery