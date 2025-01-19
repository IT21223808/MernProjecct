import React from 'react'
import "./Login.css"

const Signup = () => {

  const Signupwithgoogle = ()=>{
     window.open("http://localhost:8080/auth/google/callback","_self")
  }
  return (
    <div className="login-page">
      <h1 style={{textAlign:"center",marginBottom:"50px"}}>SignUp</h1>
      <div className="form mt-5">
       
        <button className='login-with-google-btn' onClick={Signupwithgoogle}>
           Sign up With Google
        </button>
      </div>
    </div>
  )
}

export default Signup