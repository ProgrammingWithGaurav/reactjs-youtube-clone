import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import context from '../context/Context';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, orderBy, onSnapshot, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { Typography, Container, Button, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function PlayVideo() {
    const { videoPlaying, setVideoPlaying, user } = useContext(context);
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        if (videoPlaying === '') {
            navigate('/');
        }
    }, [])

    useEffect(async () => {
        const docRef = doc(db, "youtube-videos", videoPlaying);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setVideo(docSnap.data());
        } else {
            navigate('/')
        }
    }, [db])

    useEffect(() => onSnapshot(
        collection(db, 'youtube-videos', videoPlaying, 'likes'),snapshot => setLikes(snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      })))
    ), [db, videoPlaying])

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "youtube-videos", videoPlaying, "likes", user.uid));
        } else {
            await setDoc(doc(db, "youtube-videos", videoPlaying, "likes", user.uid), {
                username: user.displayName,
                id: user.uid,
            })
        }
    }

    useEffect(() => {
        setHasLiked(
            likes.findIndex(like => like.id === user?.uid) !== -1)
    }, [likes])



    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <video style={{
                width: '100%',
                height: '50vh',
                minHeight: '400px'
            }} controls='controls' autoPlay loop src={video?.videoUrl} />
            <Typography variant='h5'>{video?.title}</Typography>
            <Typography >{video?.description}</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <Container style={{ display: 'flex', justifyContent: 'space-between', width: '40%', alignItems: 'center' }}>
                    <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={video?.channelPhoto} />
                    <Typography>{video?.channelName}</Typography>
                </Container>
                <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={likePost}>
                        <ThumbUpIcon style={{color: hasLiked ? 'blue': 'gray', marginRight: '3px'}} />
                        <Typography>{likes.length}</Typography>
                    </IconButton>
                    <Button color='error' variant='outlined'>Subsribe</Button>
                </Container>
            </div>
        </div>
    )
}

export default PlayVideo
