import React from 'react'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logOut } from '../../slice/loginSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export default function Header() {


  const dispatch = useDispatch();

  const navigate = useNavigate();


  let logout = () => {
    dispatch(logOut())
    navigate('/');
  }


  let login = useSelector((state) => {
    return state.login.token
  })



  return (
    <header className="absolute top-0 left-0 z-[100] w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0))] px-3 py-5 text-white md:px-4 lg:px-10 flex items-center justify-between">

      {/* Netflix Logo */}
      <div className="w-[160px] sm:w-[180px] lg:w-[200px]">
        <Link to="/">
          <img
            src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAQ4TXm1OaapkwYRGseWYrT2HFpAFV7IX9bgV76BxLOD_049HTkgqZ6zq3enQ0gxU1b-868yGZj1I99Ak9oRykNILYsbpT_0d-be9QKbwkD8OfaEdWL-FHZBiORJ9ppzVCM1-mVn63afS.svg"
            alt="Netflix Logo"
            className="w-full"
          />
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3">

        {login!='' ? (
          <>

            <button className="flex items-center gap-1  rounded bg-[#e50914] px-2.5 py-1.5 text-sm text-white sm:px-3 sm:py-2">
              <Link to="/account">
              My Account
              </Link>
            </button>
               <button className="flex items-center gap-1  rounded bg-[#e50914] px-2.5 py-1.5 text-sm text-white sm:px-3 sm:py-2">
              <Link to="/browse">
              Browse
              </Link>
            </button>
          </>
        )
          : (
            <></>
          )}







     
      </div>

    </header>
  )
}