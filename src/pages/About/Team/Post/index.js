import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
  import EmailIcon from '@mui/icons-material/Email';
  import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


function Post({ fullName, email, phone, timestamp, role, uid, social, profilePhoto }) {
  return (
    <Card
    style={{
        width: "100%",
        margin: 1,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        maxWidth: 350,
    }}
    >
    <CardBody className="text-center">
    <center
    >
    <img src={profilePhoto} alt='Profile Photo' style={{ height:150, width:150, borderRadius:75, border: '2px solid #F57500'}} />
    </center>
      <Typography variant="h4" color="blue-gray" className="mb-2">
        {fullName}
      </Typography>
      <Typography color="blue-gray" className="font-medium" textGradient>
        {role}
      </Typography>
      <hr style={{borderTop:'2px solid #F57500', marginTop:-25}} />

      <div style={{
        marginBottom:-45,
      }}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Typography color="gray"><LocalPhoneIcon /></Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        <a href={`tel:${phone}`} style={{color:'#F57500'}}>{phone}</a>
        </Typography>
        </div>

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:-15}}>
        <Typography color="gray"><EmailIcon /></Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        <a href={`mailto:${email}`} style={{color:'#F57500'}}>{email}</a>
        </Typography>
        </div>
      </div>
    </CardBody>
  </Card>
  )
}

export default Post