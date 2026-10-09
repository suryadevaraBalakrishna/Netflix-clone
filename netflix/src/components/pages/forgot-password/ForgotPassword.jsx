import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify'

export default function ForgotPassword() {

    let handleSubmit = (event) => {
        event.preventDefault();
        let email = event.target.email.value;
        console.log(email);
        axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_WEBSITE_USER_FORGOT_PASSWORD, {
            email: email
        }).then((result) => {
            if (result.data.status == true) {
                toast.success(result.data.message);
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
            <div className="absolute inset-0">
                <img
                    alt="Netflix background"
                    className="h-full w-full object-cover"
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background_canada_2024__by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw"
                />
            </div>
            <div className="absolute inset-0 bg-black/65"></div>
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-28">
                <div className="w-full max-w-[450px] rounded bg-black/80 px-6 py-8 sm:px-10 sm:py-12">
                    <h1 className="mb-7 text-3xl font-bold text-white">Forgot Password</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            placeholder="Email"
                            className="h-14 w-full rounded bg-[#333] px-4 text-base text-white placeholder-gray-400 outline-none transition focus:bg-[#454545]"
                            type="email"
                          
                            name='email'
                        /><button
                            type="submit"
                            className="h-14 w-full rounded bg-[#e50914] font-semibold text-white transition hover:bg-[#f6121d]"
                        >
                            Send Reset Link
                        </button>
                    </form>

                </div>
            </div>
        </div>

    )
}
