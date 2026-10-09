import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { logOut } from '../../../slice/loginSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
 
export default function Account() {

  let [Updated,setUpdated]=useState(false);

  const navigate=useNavigate();

   
  let [Tab,setTab]=useState('dashboard');

  let [userDetails,setuserDetails]=useState();

  let token=useSelector((state)=>state.login.token);

  const dispatch = useDispatch();

    let logout = () => {
      dispatch(logOut())
      navigate('/');
    }
  
  useEffect(()=>{
    axios.post(import.meta.env.VITE_API_URL+import.meta.env.VITE_WEBSITE_USER_PROFILE,
      {},
       {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((result) => {
                if (result.data.status == true) {
                    setuserDetails(result.data.data);
                    console.log(result.data.data);
                } else {
                    console.log(result.data.message);
                }
            })
                .catch((error) => {
                    console.log(error);
                })
        
  },[Updated])


  let handleUpdate=(event)=>{
    event.preventDefault();
    let name=event.target.name.value;
    let email=event.target.email.value;
      axios.post(import.meta.env.VITE_API_URL+import.meta.env.VITE_WEBSITE_USER_UPDATE_PROFILE,
      {
        name:name,
        email:email
      },
       {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((result) => {
                if (result.data.status == true) {
                   toast.success(result.data.message);
                   setUpdated(true);
                } else {
                    toast.error(result.data.message);
                }
            })
                .catch((error) => {
                    console.log(error);
                })
        

  }


  let updatePassword=(event)=>{
    event.preventDefault();
    let current_password=event.target.current_password.value;
      let new_password=event.target.new_password.value;
        let confirm_password=event.target.confirm_password.value;
      axios.post(import.meta.env.VITE_API_URL+import.meta.env.VITE_WEBSITE_USER_CHANGE_PASSWORD,
      {
        current_password,
        new_password,
        confirm_password,
      },
       {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((result) => {
                if (result.data.status == true) {
                   toast.success(result.data.message);
                   setUpdated(true);
                } else {
                    toast.error(result.data.message);
                }
            })
                .catch((error) => {
                    console.log(error);
                })
        

  }



  return (
    <div className="relative min-h-screen bg-black">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          alt="Netflix background"
          className="h-full w-full object-cover"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background_canada_2024__by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-28">

        <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row">

          {/* Sidebar */}
          <aside className="w-full rounded-lg bg-black/80 p-4 md:w-[240px]">

            <h2 className="mb-5 px-3 text-xl font-bold text-white">
              My Account
            </h2>

            <div className="flex flex-col gap-2">

              <button className="rounded px-4 py-3 text-left font-medium text-white transition hover:bg-[#e50914]" onClick={()=>{setTab('dashboard')}}>
                My Dashboard
              </button>

              <button className="rounded px-4 py-3 text-left font-medium text-white transition hover:bg-[#e50914]" onClick={()=>{setTab('profile')}}>
                My Profile
              </button>

              <button className="rounded px-4 py-3 text-left font-medium text-white transition hover:bg-[#e50914]" onClick={()=>{setTab('change-password')}}>
                Change Password
              </button>

              <button className="mt-3 rounded bg-[#e50914] px-4 py-3 text-left font-medium text-white transition hover:bg-[#f6121d]" onClick={logout}>
                Logout
              </button>

            </div>

          </aside>

          {/* Right Content */}
          <main className="flex-1 rounded-lg bg-black/80 p-5 sm:p-8">

            {/* Dashboard */}
            {Tab=='dashboard' ? (
                   <section className="mb-8">

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Welcome to your Account
              </h1>

              <p className="mt-2 text-gray-400">
                Manage your profile and account settings.
              </p>

            </section>
            )
            :(
              <></>
            )
          }
        

            {/* Profile */}
            {Tab=='profile' ? (
                 <section className="mb-8 border-t border-gray-700 pt-8">

              <h2 className="mb-5 text-xl font-semibold text-white">
                My Profile
              </h2>

              <form className="space-y-4" onSubmit={handleUpdate}>

                <input
                  placeholder="Name"
                  className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
                  type="text"
                  defaultValue={userDetails?.name}
                  name='name'
                />

                <input
                  placeholder="Email or mobile number"
                  className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
                  type="email"
                  name='email'
                  value={userDetails?.email}
                  readOnly
                />

                <button
                  type="submit"
                  className="h-12 rounded bg-[#e50914] px-6 font-semibold text-white transition hover:bg-[#f6121d]"
                >
                  Update Profile
                </button>

              </form>

            </section>
            ):(
              <></>
            )}
          

            {/* Change Password */}
            {Tab=='change-password' ? (
                <section className="border-t border-gray-700 pt-8">

              <h2 className="mb-5 text-xl font-semibold text-white">
                Change Password
              </h2>

              <form className="space-y-4" onSubmit={updatePassword}>

                <input
                  placeholder="Current Password"
                  className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
                  type="password"
                  name="current_password"
                />

                <input
                  placeholder="New Password"
                  className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
                  type="password"
                  name="new_password"
                />

                <input
                  placeholder="Confirm Password"
                  className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
                  type="password"
                  name="confirm_password"
                />

                <button
                  type="submit"
                  className="h-12 rounded bg-[#e50914] px-6 font-semibold text-white transition hover:bg-[#f6121d]"
                >
                  Change Password
                </button>

              </form>

            </section>
            ):(
              <></>
            )}
           

          </main>

        </div>

      </div>

    </div>
  )
}