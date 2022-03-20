import React, {useContext, useEffect} from 'react';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {signInWithPopup} from 'firebase/auth';
import {auth, provider} from '../firebase';
import context from '../context/Context';

function Login() {
    const navigate = useNavigate();
    const {user} = useContext(context);

    const container = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: '#fafafa',
    }

    useEffect(() => {
        if(user){
            navigate('/')
        }
    }, [])

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then(result => {
                navigate('/');
            }).catch(err => alert(err.message))
    }
  return (
      <div style={container}>
          <Button variant='contained' onClick={loginWithGoogle}>Login with Google</Button>
      </div>
  )
}

export default Login