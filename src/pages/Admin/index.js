import Header from '../../components/Header'
import React from 'react'
import GroupIcon from '@mui/icons-material/Group';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Card, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import TotalCard from '../../components/TotalCard';
import Gallery from './Gallery';

function Admin() {
  return (
    <div>
    <Header />
    <div style={{background:'#fff', height:'100vh'}}>
    <Card className='home'>
    <div className='cards'>
    <TotalCard title='Quote Requests' number={300} icon={GroupIcon} />
    <TotalCard title='Bookings' number={400} icon={ConfirmationNumberIcon} />
    <TotalCard title='Albums' number={500} icon={SupervisedUserCircleIcon} />
 </div>

 <div className='cards'>
 <TotalCard title='Team' number={300} icon={GroupIcon} />
 <TotalCard title='Reviews' number={400} icon={ConfirmationNumberIcon} />
 <TotalCard title='Members' number={500} icon={SupervisedUserCircleIcon} />
</div>

<Tabs style={{marginTop:15}} id="custom-animation" value={0}>
<TabsHeader>
<Tab key={0} value={0}>
Bookings
</Tab>
<Tab key={1} value={1}>
Quotes
</Tab>
<Tab key={2} value={2}>
Albums
</Tab>
<Tab key={3} value={3}>
Reviews
</Tab>
<Tab key={4} value={4}>
Members
</Tab>
</TabsHeader>
<TabsBody
animate={{
  initial: { y: 250 },
  mount: { y: 0 },
  unmount: { y: 250 },
}}
style={{background:'#fff', borderRadius:10}}
>
<TabPanel key={0} value={0}>
 
</TabPanel>
<TabPanel key={1} value={1}>

</TabPanel>
<TabPanel key={2} value={2}>
 <Gallery />
</TabPanel>
<TabPanel key={3} value={3}>
Seeds
</TabPanel>
<TabPanel key={4} value={4}>
Seedlings
</TabPanel>
<TabPanel key={5} value={5}>

</TabPanel>
<TabPanel key={6} value={6}>

</TabPanel>
</TabsBody>
</Tabs>
    </Card>
    </div>
    </div>
  )
}

export default Admin