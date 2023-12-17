import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Avatar, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
// import Options from './Post/Options';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useState } from 'react';
import Options from './Options';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


function Post({images, albumId, albumName}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const timestampFun = (timestamp) => {
    var d = timestamp;
    //var d =val.timestamp;
    
    //NB: use + before variable name
    var date = new Date(+d);

    return date;
  }

  const sortedImages = images.sort((a, b) => b.timestamp - a.timestamp);
  
  return (
     <>
     {images.length === 0 ?(
      <center style={{fontWeight:'bold'}}>No Images </center>
     ):(
      <>
      <ImageList variant="quilted" cols={4} rowHeight={200} 
      >
        {sortedImages.map((image, index) => (
          <ImageListItem
            cols={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].cols
            }
            rows={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].rows
            }
            sx={{
              // opacity: '.7',
              transition: 'opacity .3s linear',
              cursor: 'pointer',
              // '&:hover': { opacity: 1 },
            }}
          >
          <Options
          imageId={index}
          uid={image?.fromId}
          imageURL={image?.url}
          albumId={albumId}
          images={images}
          image={image}
        />

            <img
              {...srcset(
                image?.url,
                200,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              )}
              alt={image?.firstName || image?.email?.split('@')[0]}
              loading="lazy"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
            <Typography
              variant="body2"
              component="span"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                color: '#fff',
                background: 'rgba(0,0,0, .3)',
                p: '5px',
                borderTopRightRadius: 8,
              }}
            >
            {moment(image?.timestamp).fromNow()}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
      {isOpen && (
        <Lightbox
        style={{zIndex:2000}}
          mainSrc={images[photoIndex]?.url}
          nextSrc={
            images[(photoIndex + 1) % images.length]?.url
          }
          prevSrc={
            images[(photoIndex + images.length - 1) % images.length]
              ?.url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + images.length - 1) % images.length
            )
          }
          imageTitle={images[photoIndex]?.comment}
          imageCaption={timestampFun(images[photoIndex]?.timestamp)?.toDateString()}
        />
      )}
      </>
     )}
    </>
  )
}

export default Post

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];