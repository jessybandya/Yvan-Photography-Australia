import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Addimages from './Addimages'
import { db } from '../../../firebase'
import { Backdrop, CircularProgress, ImageListItem, ListSubheader } from '@mui/material'
import Header from '../../../components/Header'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

function Images() {
  const { id } = useParams()
  const [post, setPost] = React.useState([])
  const [code, setCode] = React.useState('')
  const [open, setOpen] = React.useState(false);


   const checkCode = () =>{
    if(code === post.code){
      setOpen(true)
    }else{
      setOpen(false)
      toast.error('Invalid Code!',{
        position: toast.POSITION.TOP_CENTER
      })
   }
  }

  useEffect(() => {
     db.collection('albums').doc(id).get().then((snapshot) => {
        setPost(snapshot.data())
     })
  }, [id])
  

  return (
    <div
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/media/images/img-2.jpg')",
        height: '10vh',
    }}
    >
    <Header />
    {post.visibility === 'public' ? (
      <>
      <ImageListItem key="Subheader" cols={2}>
      <ListSubheader component="div">{post.name}</ListSubheader>
    </ImageListItem>
      <div>
      <Addimages albumId={id} />
      </div>
      </>
    ) :(
      <>
       {open ? (
        <>
        <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">{post.name}</ListSubheader>
      </ImageListItem>
        <div>
        <Addimages albumId={id} />
        </div>
        </>
       ):(
        <div style={{display:'table', margin:'auto', marginTop:100}}>
        <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="orange"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Enter Code
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Code" color="orange" size="lg"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={checkCode} color="orange" variant="gradient" fullWidth>
            Check
          </Button>
        </CardFooter>
      </Card>
        </div>
       )}
      </>
    )}

    </div>
  )
}

export default Images