
import React, {useRef} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, Route, Router } from 'react-router-dom'
import { auth } from '../../firebase'
import {  toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const emailRef= useRef(null)
  const passRef = useRef(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const login = (e) =>{

    setLoading(true)
    e.preventDefault()

    signInWithEmailAndPassword(auth,emailRef.current.value,passRef.current.value)
    .then(userCredential => {
      setLoading(false)
      toast.success("Welcome " + userCredential.user.displayName, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        navigate("/plans")
    })
    .catch(err => {
      setLoading(false)
      toast.error("Please Enter Valid Credentials!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
  }
  return (
    <div className="card">
        <div className="card__content">
            <h3>Login to your account</h3>
            <form onSubmit={login}>
                
                <label htmlFor="email">Email</label>
                <input  required ref={emailRef} type="email" name='email' id="email" />

                <label htmlFor="password">Password</label>
                <input required ref={passRef} type="password"  name='password' id="password" />


                <input className='btn' id='btn' type="submit"  value={loading ? "Please Wait..." : "Login"} />

                <p className='formfooter'>New to RichPanel? <Link to="/">Sign Up</Link></p>
            </form>
        </div>
    </div>
  )
}
