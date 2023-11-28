import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Addimages from './Addimages'
import { db } from '../../../firebase'

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
    <center>{post?.name}</center>
    <div>
    <Addimages albumId={id} />
    </div>
    </div>
  )
}

export default Images