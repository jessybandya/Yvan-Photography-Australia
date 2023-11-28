import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Addimages from './Addimages'
import { db } from '../../../firebase'
import { ImageListItem, ListSubheader } from '@mui/material'
import Header from '../../../components/Header'

function Images() {
  const { id } = useParams()
  const [post, setPost] = React.useState([])

  useEffect(() => {
     db.collection('albums').doc(id).get().then((snapshot) => {
        setPost(snapshot.data())
     })
  }, [id])
  

  return (
    <div>
    <Header />
    <ImageListItem key="Subheader" cols={2}>
    <ListSubheader component="div">{post.name}</ListSubheader>
  </ImageListItem>
    <div>
    <Addimages albumId={id} />
    </div>
    </div>
  )
}

export default Images