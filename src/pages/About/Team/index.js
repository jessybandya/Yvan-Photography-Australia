import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Post from './Post';

function Team() {
    const [posts, setPosts] = React.useState([])  
     React.useEffect(() => {
         db.collection('team').orderBy("timestamp","asc").onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);

  return (
    <div style={{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
    }}>
    {
        posts?.length > 0 ?(
          <>
          {
             posts.map(({id, post}) => (
                 <Post
                 key={id} 
                 fullName={post.fullName}
                 email={post.email}
                 phone={post.phone}
                 timestamp={post.timestamp}
                 role={post.role}
                 uid={id}
                 social={post.social}
                 profilePhoto={post?.profilePhoto}
                 />
               ))
}
          </>
       ):(
         <div style={{display:'table',margin:'auto',fontSize:18, color:'#fff'}}>loading...</div>
       )
      }
    </div>
  )
}

export default Team