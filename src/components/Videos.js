import React, {useState, useEffect} from 'react';
import Video from './Video';
import { onSnapshot, orderBy, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import {Container} from '@mui/material';

const Videos = () => {
    const container = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px'        
    }
    const [videos, setVideos] = useState([]);

    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "youtube-videos"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => {
            setVideos(snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })));
          }
        ),
      [db]
    );

    return (
        <>
        <Container style={container} >
            {
                  videos.length > 0 && videos.map(({title, videoUrl, description, channelName, channelPhoto, timestamp, id}) => (
                    <Video key={id} id={id} title={title} videoUrl={videoUrl} description={description} channelPhoto={channelPhoto} channelName={channelName} timestamp={timestamp}/>
                ))
            }
        </Container>
        </>

    )
}

export default Videos;