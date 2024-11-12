import { useState, useEffect, useRef } from 'react';
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom';
import Game from './components/Game.jsx';
// import '../public/assets/css'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)


  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))
  
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  
    // If the token exists, verify it with the auth server to see if it is valid
    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('success' === r.message)
        setEmail(user.email || '')
      })
  }, [])

  // useEffect(() => {
  //   // Fetch the user email and token from local storage
  //   const user = JSON.parse(localStorage.getItem('user'));
  
  //   // If the token/email does not exist, mark the user as logged out
  //   if (!user || !user.token) {
  //     setLoggedIn(false);
  //     return;
  //   }
  
  //   // If the token exists, verify it with the auth server to see if it is valid
  //   fetch('http://localhost:3080/verify', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'jwt-token': user.token,  // Send the token for verification
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) throw new Error('Token verification failed');
  //       return response.json();
  //     })
  //     .then((result) => {
  //       if ('success' === result.message) {
  //         setLoggedIn(true);        // Mark user as logged in
  //         setEmail(user.email || '');  // Set email from local storage
  //       } else {
  //         setLoggedIn(false);       // Mark user as logged out
  //         localStorage.removeItem('user');  // Clear invalid token
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error during token verification:', error);
  //       setLoggedIn(false);          // Mark user as logged out on error
  //       localStorage.removeItem('user');  // Clear token if verification failed
  //     });
  // }, []);
  
  

  function PrivateRoute({ children}){
    return loggedIn ? children : <Navigate to="/"/>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route 
              path="/"
              element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
            />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail}/>}
            />
            <Route
              path="/game"
              element={<Game loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
            />
            {/* <Route path="/game" element={
              <PrivateRoute>
                <Game loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </PrivateRoute>
            } /> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
