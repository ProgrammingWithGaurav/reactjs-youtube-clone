import React, {useContext, useEffect} from 'react';
import Header from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import context from './context/Context';
import Videos from './components/Videos';
import { auth } from './firebase';
import PlayVideo from './components/PlayVideo';

function App() {
  const {user, setUser} = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        navigate('/')
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line 
  }, []);
  return (
    <>
          <Routes>
            <Route path='/' element={
              <>
                <Header />
                <Videos />
              </>
            }
            />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/video' element={
              <>
                <Header />
                <PlayVideo />
              </>
            } />
          </Routes>
    </>
  )
}

export default App