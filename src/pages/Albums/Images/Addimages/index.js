import React, { useEffect, useState } from 'react'
import Post from './Post';
import { db } from '../../../../firebase';

function Addimages({albumId}) {
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");

   useEffect(() => {
       db.collection('albums').where("albumId","==",albumId).onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);

  return (
    <div
    style={{
      height: '80vh',
      overflow: 'auto',
      backgroundColor: 'white',
    }}
    >
    {
      posts.map(({id, post}) => (
         <Post
         key={id} 
         albumID={id}
         albumName={post?.name}
         images={post?.images}
         albumId={id}
         visibility={post?.visibility}
         />
       ))
}
    </div>
  )
}

export default Addimages