import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { auth } from '../../../firebase'

function Reset({ setOpen }) {
    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const resetFun = async() => {
        setLoading(true)
        if(!email){
            toast.error('Please enter your email address!',{
              position: "top-center",
            })
            setLoading(false)
          }else{
            setLoading(true)
            const config ={
                url: `https://yvan-app.web.app/admin`,
                handleCodeInApp: true
            };
          
              await auth
              .sendPasswordResetEmail(email,config)
              .then(() => {
               setEmail('')
               setOpen(false)
               setLoading(false)
               Swal.fire({
                icon: 'success',
                title: `Password reset link sent successfully to "${email}"!`,
                customClass: {
                    container: "my-swal-container", // Add a custom CSS class name
                  },
              })
              })
              .catch((error)=>{
                setLoading(false)
               toast.error(error.message,{
                  position: toast.POSITION.TOP_CENTER
              })
              })
          }
    }
  return (
    <Card className="w-full">
    <CardHeader
      variant="gradient"
      color="orange"
      className="grid h-28 place-items-center"
    >
      <Typography variant="h3" color="white">
        Password Reset
      </Typography>
    </CardHeader>
    <CardBody className="flex flex-col gap-4">
    <ToastContainer />
      <Input 
      type='email'
      onChange={(e)=> setEmail(e.target.value)}
      value={email}
      label="Email"
      color='orange'
      size="lg" />
    </CardBody>
    <CardFooter className="pt-0">
      <Button onClick={resetFun} variant="gradient" color='orange' fullWidth>
        {loading ? 'Resetting...' : 'Reset'}
      </Button>
    </CardFooter>
  </Card>
  )
}

export default Reset