import React from 'react'
import {Card, Typography, CardActionArea, CardContent} from '@mui/material';
import Moment from 'react-moment';

function Comment({comment, timestamp, username, userImg}) {
    return (
        <Card style={{ minWidth: '95vw' , margin: '20px 0'}}>
        <CardActionArea style={{display: 'flex', alignItems: 'center'}}>
          <div style={{display: 'flex', width: '40%', alignItems: 'center'}}>
            <img src={userImg} style={{marginRight: '5px', width: '40px', height: '40px', borderRadius: '50%'}} />
            <Typography>{username}</Typography>
          </div>
          <CardContent>
            <Typography gutterBottomcomponent="div">
            </Typography>
            <Typography color="text.secondary">
            {comment}
            </Typography>
            <Moment fromNow >
                {timestamp?.toDate()}
              </Moment>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default Comment
