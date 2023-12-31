import { ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'

function Images({ images, name, timestamp, visibility, code }) {
    const d = timestamp;
    const date = new Date(+d);
    const sortedImages = images.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
    {visibility === 'private' ?(
      <ImageListItem className='image-list-item'>
      <img
      srcSet={`${images[0]?.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      src={`/media/images/yvan.jpg?w=164&h=164&fit=crop&auto=format`}
      alt={name}
      loading="lazy"
      style={{height:250, width:350}}
    />
     <center>
     <ImageListItemBar
     title={name}
     subtitle={<span>({visibility})</span>}
   />
     </center>
    </ImageListItem>
    ):(
      <ImageListItem className='image-list-item'>
      <img
      srcSet={`${sortedImages[0]?.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      src={`${sortedImages[0]?.url}?w=164&h=164&fit=crop&auto=format`}
      alt={name}
      loading="lazy"
      style={{height:250, width:350}}
    />
     <center>
     <ImageListItemBar
     title={name}
     subtitle={<span>({visibility})</span>}
   />
     </center>
    </ImageListItem>
    )}
  </>
  )
}

export default Images