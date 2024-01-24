import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Niagara</h1>
      <form className='flex flex-col items-center'>
        <input className='form-element' id='userName' type='string' placeholder='Enter your user' />
        <input className='form-element' id='password' type='password' placeholder='Enter your password'/>
        
        <button className='form-buttom' type='submit'> Sign In</button>
        
      </form>
    </div>
  );
};

export default Login;
