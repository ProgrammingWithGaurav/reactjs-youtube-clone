import React, {useEffect, useState, useContext} from 'react';
import {Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Avatar} from '@mui/material';
import Moment from "react-moment";
import {useNavigate} from 'react-router-dom';
import context from '../context/Context';

export default function Video({title, videoUrl, description, channelPhoto, channelName, timestamp, id}) {
  const navigate = useNavigate();
  const {videoPlaying, setVideoPlaying} = useContext(context);
  return (
    <Card sx={{ maxWidth: 450 , margin: '6px'}} onClick={()=>{
      setVideoPlaying(id);
      navigate('/video')
    }}>
      <CardActionArea>
        <CardMedia
          component="video"
          height="160"
          image={videoUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.length > 25 ? description.slice(0, 25) + '...' : description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button size="small">
          <Avatar src={channelPhoto} style={{marginRight: '4px'}} />
          <Typography variant='caption'>{channelName}</Typography>
        </Button>
        <Typography variant='caption'>100 views •  <Moment fromNow className="text-sm pr-5">
                {timestamp?.toDate()}
              </Moment></Typography>
      </CardActions>
    </Card>
  );
}
