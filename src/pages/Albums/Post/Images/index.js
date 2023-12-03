import { ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'

function Images({ images, name, timestamp, visibility, code }) {
    const d = timestamp;
    const date = new Date(+d);
  return (
    <ImageListItem className='image-list-item'>
    <img
    srcSet={`${images[0]?.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
    src={`${images[0]?.url}?w=164&h=164&fit=crop&auto=format`}
    alt={name}
    loading="lazy"
    style={{height:250, width:350}}
  />
    <ImageListItemBar
      title={name}
      subtitle={<span>({visibility})</span>}
    />
  </ImageListItem>
  )
}

export default Images