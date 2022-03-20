import React, {useContext, useEffect} from 'react';
import Header from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import context from './context/Context';
import { auth } from './firebase';

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
              </>
            }
            />
            <Route exact path='/login' element={<Login />} />
          </Routes>
    </>
  )
}

export default App