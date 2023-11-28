import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Rating } from '@mui/material';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';


  function Review({ fullName, message, timestamp, value }) {
    const formattedTimestamp = moment(parseInt(timestamp)).fromNow();



  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);

  const actions = [
    <span style={{display:'flex',alignItems:'center'}}>
    {value}/5 <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
    </span>,
  ];



    return (
      <Comment
      actions={actions}
      author={`${fullName}`}
      avatar={<Avatar src="/media/images/avatar.jpg" alt="Photo" />}
      content={message}
      datetime={
        <Tooltip title={`${date}`}>
          <span>{formattedTimestamp}</span>
        </Tooltip>
      }
    />
    );
  }

export default Review