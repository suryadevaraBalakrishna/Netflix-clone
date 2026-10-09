import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux' 
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { userDetails } from '../../../slice/loginSlice';
import { useSelector } from 'react-redux';
 
export default function Login() {
   
  const [isLogin,setisLogin]=useState(false);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');

  let [showpassword,setshowpassword]=useState(true);
   
  let handleLogin=()=>{
    setisLogin(!isLogin);
  }


 const dispatch=useDispatch();

 const navigate=useNavigate();





  let handleSubmit=(e)=>{
    e.preventDefault();
    console.log({name,email,password});
    if(!isLogin){
       axios.post(import.meta.env.VITE_API_URL+import.meta.env.VITE_WEBSITE_USER_REGISTER,{
        name:name,
        email:email,
        password:password
      })
    .then((result)=>{
       if(result.data.status==true){
         toast.success(result.data.message);
          setName('');
          setEmail('');
          setPassword('');
           setisLogin(true);
          
       }else{
          toast.error(result.data.message);
       }
    })
    .catch((error)=>{
      console.log(error);
    })
    }else{
         axios.post(import.meta.env.VITE_API_URL+import.meta.env.VITE_WEBSITE_USER_LOGIN,{
        email:email,
        password:password
      })
    .then((result)=>{
       if(result.data.status==true){
         toast.success(result.data.message);
          setEmail('');
          setPassword('');
          dispatch((userDetails({
             user:result.data.data,
             token:result.data.token
          })))
           navigate('/account');

       }else{
          toast.error(result.data.message);
          
       }
    })
    .catch((error)=>{
      console.log(error);
    })
    }
    
   

  }


  return (
    <div className="relative min-h-screen bg-black">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background_canada_2024__by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw"
          alt="Netflix background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Login Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-28">

        {/* Login Card */}
        <div className="w-full max-w-[450px] rounded bg-black/80 px-6 py-8 sm:px-10 sm:py-12">

          {/* Heading */}
          <h1 className="mb-7 text-3xl font-bold text-white">
           {isLogin ? 'Sign In' : 'Sign Up'}
          </h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>

        
            {/* Name */}
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
              />
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email or mobile number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
            />

            {/* Password */}
            <input
              type={showpassword ? "password" : "text"}
              placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
            />

            <input type='checkbox' onChange={()=>{setshowpassword(!showpassword)}}/>
            <label className='text-white'> show password</label>
           


            {/* Sign In Button */}
            <button
              type="submit"
              className="h-14 w-full rounded bg-[#e50914] font-semibold text-white transition hover:bg-[#f6121d]"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>

          </form>

          {/* Remember / Forgot */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-400">

          

            <Link to="/forgot-password" className="hover:underline" >
              Forgot password?
            </Link>

          </div>

          {/* Sign Up */}
          <div className="mt-10 text-gray-400">
            <span>New to Netflix? </span>

            <button className="font-medium text-white hover:underline" onClick={handleLogin}>
              {isLogin ? 'Sign Up now' : 'Sign In now'}
            </button>
          </div>

        

        </div>
      </div>

    </div>
  )
}