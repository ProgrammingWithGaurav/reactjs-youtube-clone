import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import State from './context/State';

function App() {
  return (
    <>
      <State>
        <Router>
          <Routes>
            <Route path='/' element={
              <>
                <Header />
              </>
            }
            />
          </Routes>
        </Router>
      </State>
    </>
  )
}

export default App