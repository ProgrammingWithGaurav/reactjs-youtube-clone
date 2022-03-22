import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import context from '../context/Context';
import { db } from '../firebase';
import { addDoc, collection, orderBy, onSnapshot, deleteDoc, setDoc, serverTimestamp, query, doc, getDoc } from "firebase/firestore";
import { Typography, Container, Button, IconButton, TextField } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';

function PlayVideo() {
    const { videoPlaying, user } = useContext(context);
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
    }, [navigate, videoPlaying])

    useEffect(async () => {
        const docRef = doc(db, "youtube-videos", videoPlaying);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setVideo(docSnap.data());
        } else {
            navigate('/')
        }
    }, [navigate, videoPlaying])

    useEffect(() => onSnapshot(
        collection(db, 'youtube-videos', videoPlaying, 'likes'), snapshot => setLikes(snapshot.docs.map(doc =>
             ({
            id: doc.id, ...doc.data()
        })
        ))
    ), [videoPlaying])

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
    }, [likes, user?.uid])

    const sendComment = async () => {
        if (comment.trim() !== '') {
            const commentToSend = comment;
            setComment("");

            await addDoc(collection(db, "youtube-videos", videoPlaying, "comments"), {
                comment: commentToSend,
                username: user.displayName,
                userImg: user.photoURL,                
                timestamp: serverTimestamp(),
            });
        }

    };

    useEffect(() => onSnapshot(
        query(
            collection(db, 'youtube-videos', videoPlaying, 'comments'),
            orderBy('timestamp', 'desc')
        )
        , snapshot => setComments(snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        })))
    ), [videoPlaying])


    return (
        <div style={{ width: '100%' }}>
            <video style={{
                width: '100%',
                height: '50vh',
                minHeight: '400px'
            }} controls='controls' autoPlay loop src={video?.videoUrl} />
            <Typography variant='h5'>{video?.title}</Typography>
            <Typography >{video?.description}</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
                <Container style={{ display: 'flex', justifyContent: 'space-between', width: '40%', alignItems: 'center' }}>
                    <img alt='' style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={video?.channelPhoto} />
                    <Typography>{video?.channelName}</Typography>
                </Container>
                <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={likePost}>
                        <ThumbUpIcon style={{ color: hasLiked ? 'blue' : 'gray', marginRight: '3px' }} />
                        <Typography>{likes.length}</Typography>
                    </IconButton>
                    <Button color='error' variant='outlined'>Subsribe</Button>
                </Container>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Typography variant='h5'>Comments</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField style={{ width: '97%' }} label='Add a Comment' value={comment} onChange={text => setComment(text.target.value)} />
                    <IconButton onClick={sendComment} disabled={comment.trim()===''}>
                        <SendIcon />
                    </IconButton>
                </div>

                <div style={{ overflowY: 'scroll', height: '50vh' }}>
                    {
                        comments.map(({comment, timestamp, username, userImg}) => (
                            <Comment comment={comment} timestamp={timestamp} username={username} userImg={userImg}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default PlayVideo
