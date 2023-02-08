import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'

import "./Login.css"
function Login() {
    const history = useNavigate();
    const signIn = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history('/')
            })
            .catch(error => alert(error.message))
    }
    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)
                if (auth) {
                    history('/')
                }
            })
            .catch(error => alert(error.message))
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='login'>
            <Link to="/">
                <img className='loginLogo' src="https://www.pngplay.com/wp-content/uploads/3/Amazon-Prime-Logo-Download-Free-PNG.png" alt='Amazon Logo' />
            </Link>
            <div className='loginContainer'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => {
                        setEmail(e.target.value)
                    }} />
                    <h5>Password</h5>
                    <input type="password" onChange={e => {
                        setPassword(e.target.value)
                    }} />
                    <button className='signINButton' onClick={signIn}>Sign In</button>
                </form>
                <p>
                    By signing in agree to AMAZON FAKE CLONE conditions
                </p>
                <button className='signUPButton' onClick={register}>Create Your Account</button>
            </div>
        </div>

    )
}

export default Login