import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import Chat from './chat';
import { selectUser, login, logout } from '../features/userSlice'
import Login from './login';
import { auth } from '../firebase';


function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [])

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser)
      if(authUser) {
        // the user is logged in 
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))

      } else {
        // the user is logged out
        dispatch(logout())
      }
    })
  }, [dispatch])

  const handleResize = () => {
    setWidth(window.innerWidth)
    console.log(width)
  } 

  return (
    <div className="app">
      { user ? (
          <>
            <Sidebar />
            <Chat />
          </>
        ) : (
          <Login />
        )
      }
      
    </div>
  );
}

export default App;
