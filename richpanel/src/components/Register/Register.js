
import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { useRef } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const [loading,setLoading] = useState(false)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passRef = useRef(null)
  const navigate = useNavigate()

  const register= (e) => {

    setLoading(true)
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value
    const password = passRef.current.value
    
    createUserWithEmailAndPassword(auth,email,password)
    .then( userCredential => {
        const user = userCredential.user
        updateProfile(user,{displayName: name}).then(()=> {
          setLoading(false)
          toast.success("Account Created Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          navigate('/login')
        }).catch(err=> {
          setLoading(false)
        })
    })
    .catch( err => {
      setLoading(false)
      const errmsg = err.message;
      toast.error(errmsg, {
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
            <h3>Create Account</h3>
            <form onSubmit={register}>
                <label htmlFor="name">Name</label>
                <input ref={nameRef} required type="text" name='name' minLength="3" id='name'/>

                <label htmlFor="email">Email</label>
                <input ref={emailRef} required type="email" name='email' id="email" />

                <label htmlFor="password">Password</label>
                <input ref={passRef} required minLength="8" type="password" name='password' id="password" />


                <input  className='btn' id='btn' type="submit" value={loading ? "Please Wait..." : "Sign Up"}/>
   
            
               
                <p className='formfooter'>Already have an account? <Link to="/login">Login</Link></p> 
            </form>
        </div>
    </div>
  )
}
