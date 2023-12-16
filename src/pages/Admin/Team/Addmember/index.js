import { Button, Card, CardBody, Input } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { db } from '../../../../firebase'

function Addmembers({ setOpen }) {
    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState('')
    const [whatsAppNum, setWhatsAppNum] = useState('')
    const [num, setNum] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)


    const addTeamMember = () => {
        setLoading(true)
        const uid = db.collection("team").doc().id;

        if(!fullName){
            toast.error('Full Name is required!', {
                position: 'top-center'
            })
            setLoading(false)
        }else if(!role){
            toast.error('Role is required!', {
                position: 'top-center'
            })
            setLoading(false)
        }else if(!num){
            toast.error('Phone Number is required!', {
                position: 'top-center'
            })
            setLoading(false)
        }else if(!email){
            toast.error('Email is required!', {
                position: 'top-center'
            })
            setLoading(false)
        }else{
            setLoading(true)

            db.collection("team")
            .doc(uid)
            .set({
              fullName,
              role,
              email,
              phone:num,
              uid,
              timestamp: Date.now(),
              profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/yvan-app.appspot.com/o/yvan.jpg?alt=media&token=fddc774d-9e5c-4285-b1f3-48661a289ee1',
              social: []
            })
            .then(() => {
              setLoading(false);
              setOpen(false);
              setFullName("");
              setEmail("");
              setNum("");
              setWhatsAppNum("");
              setRole("")
              Swal.fire({
                icon: "success",
                title: "Added Successfully!",
                text: `Team Member has been added successfully to the database!`,
                customClass: {
                    container: 'my-swal-container', // Add a custom CSS class name
                }
              })
            });
        }

    }

  return (
    <Card className="mx-auto w-full">
    <CardBody className="flex flex-col gap-4">
    <ToastContainer />
      <Input
      value={fullName}
      color='orange'
      onChange={(e) => setFullName(e.target.value)}
      label="Full Name" size="lg" />
  
      <Input
      value={role}
      color='orange'
      onChange={(e) => setRole(e.target.value)}
      label="Role" size="lg" />

      <Input
      value={num}
      color='orange'
      onChange={(e) => setNum(e.target.value)}
      label="Phone Number" size="lg" />

      <Input
      value={email}
      color='orange'
      onChange={(e) => setEmail(e.target.value)}
      label="Email" type='email' size="lg" />

      <Button onClick={addTeamMember} color='orange' variant="gradient"  fullWidth>
      {loading ? 'Adding...' : 'Add Team Member'}
    </Button>
    </CardBody>
  </Card>
  )
}

export default Addmembers