import React from 'react'
import "./Login.css"

const Login = () => {

  const loginwithgoogle = ()=>{
     window.open("http://localhost:8080/auth/google/callback","_self")
  }
  return (
    <div className="login-page">
      <h1>LOGIN</h1>
      <div className="form">
        <form className="login-form">
          <input type="text" name='' id='' placeholder='Username'/>
          <input type="password" name='' id='' placeholder='Password'/>
          <button>Login</button>
          <p className='message'>Not Registerd? <a href="/Signup">Create an account</a></p>
        </form>
        <button className='login-with-google-btn' onClick={loginwithgoogle}>
           Sign In With Google
        </button>
      </div>
    </div>
  )
}

export default Login