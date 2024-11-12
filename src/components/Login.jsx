import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    
    const onButtonClick = ()=> {

        setEmailError("");
        setPasswordError("");

        if('' === email){
            setEmailError("Please Enter your email");
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email!')
            return
            
        }

        if('' === password){
            setPasswordError('Please Enter you password');
            return
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }


         // Check if email has an account associated with it
        checkAccountExists((accountExists) => {
            // If yes, log in
            if (accountExists) logIn()
            // Else, ask user if they want to create a new account and if yes, then log in
            else if (
            window.confirm(
                'An account does not exist with this email address: ' +
                email +
                '. Do you want to register a new account?',
            )
            ) {
            logIn()
            }
        })
    }

    const checkAccountExists = (callback)=> {
       fetch('http://localhost:3080/check-account', {
        method: 'POST',
        headers: {
      'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        })
        .then(response => response.json())
        .then(response => callback(response?.userExists))
    }

   // Log in a user using email and password
const logIn = () => {
    fetch('http://localhost:3080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ('success' === r.message) {
          localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
          props.setLoggedIn(true)
          props.setEmail(email)
          navigate('/')
        } else {
          window.alert('Wrong email or password')
        }
      })
  }

    return(
       <>
        <div className="login-box">
            <div>
                <p className="text-4xl font-bold text-red-500">Login</p>
            </div>
            <br />
            <div className="flex flex-col">
                <input
                    className="p-2 rounded text-slate-100" 
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <label className="h-4 text-sm text-left text-red-400">{emailError}</label>

            </div>
            <br />
            <div className="flex flex-col">
                <input 
                    className="p-2 rounded text-slate-200"
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <label className="h-4 text-sm text-left text-red-400">{passwordError}</label>
            </div>
            <br />
            <div>
                <input 
                    className="w-20 p-1 bg-red-400 border-2 border-red-400 rounded cursor-pointer"
                    type="button" onClick={onButtonClick} value={'Log in'} />
            </div>
        </div>
       </>
    )
}
export default Login;