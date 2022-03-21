import { Button, Container, TextField, Typography } from '@mui/material'
import React, { useState, useRef, useContext } from 'react';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { db, storage } from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import context from '../context/Context';
import {useNavigate} from 'react-router-dom';

function CreateVideo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const filePickerRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const { user } = useContext(context);
    const navigate = useNavigate();

    const uploadPost = async () => {
        if (title !== '' && description !== '' && selectedFile !== null) {
            const docRef = await addDoc(collection(db, 'youtube-videos'), {
                videoUrl: '',
                title: title,
                description: description,
                channelPhoto: user.photoURL,
                channelName: user.displayName,
                timestamp: serverTimestamp()
            });

            const videoRef = ref(storage, `youtube-videos/${docRef.id}/video`);
            await uploadString(videoRef, selectedFile, 'data_url').then(async snapshot => {
                const downloadURL = await getDownloadURL(videoRef);
                await updateDoc(doc(db, 'youtube-videos', docRef.id), {
                    videoUrl: downloadURL
                })
            })
            setSelectedFile(null);
            await navigate('/');
        }
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };
    return (
        <div style={{ marginTop: '100px' }}>
            <Container>
                <Typography variant='h3' style={{ marginBottom: '10px' }}>Create a new Video</Typography>
                <TextField value={title} onChange={(text) => setTitle(text.target.value)} label="Video Title" fullWidth style={{ marginBottom: '10px' }} />
                <TextField value={description} onChange={(text) => setDescription(text.target.value)} label="Video Description" style={{ marginBottom: '10px' }} fullWidth multiline rows={5} />
                <Button variant="contained" component="label" style={{ marginBottom: '10px' }}>
                    Upload Video <VideoFileIcon />
                    <input
                        type='file'
                        accept='video/*'
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                    />
                </Button>
                <Button onClick={uploadPost}>Post</Button>
            </Container>

        </div>
    )
}

export default CreateVideo
