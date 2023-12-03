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
import { ImageListItem, ImageListItemBar } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import Images from "./Images";
 
export default function Post({ albumId, images, name, timestamp, visibility, code }) {

  return (
    <a href={`/our-gallery/images/${albumId}`}>
     <Images images={images} name={name} timestamp={timestamp} visibility={visibility} code={code}/>
    </a>
  );
}