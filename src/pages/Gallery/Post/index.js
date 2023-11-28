import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

 
export default function Post({ albumId, images, name, timestamp, ownerId }) {
  const d = timestamp;
  const date = new Date(+d);
  return (
    <a href={`/our-gallery/images/${albumId}`}>
    <Card style={{width:500}} className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue">
        <img
          src={images[0].url}
          alt="Image 1"
          style={{height:200, width:'100%', objectFit:'cover'}}
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <center className="mb-3 flex items-center justify-center">
          <Typography variant="h6" color="blue-gray" className="font-medium">
            {name.length > 50 ?(
              <>
              {name.substring(0, 50)}<span>...</span>
              </>
            ):(
              <>
              {name.substring(0, 50)}
              </>
            )}
          </Typography>
        </center>
        <Button color="green" size="lg" fullWidth={true}>
        {date.toDateString()}  
      </Button>
      </CardBody>
    </Card>
    </a>
  );
}