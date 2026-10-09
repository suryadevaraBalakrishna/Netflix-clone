import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Route } from 'react-router'
import Account from './components/pages/account/Account'
import { Routes } from 'react-router'
import Login from './components/pages/login/Login'
import ForgotPassword from './components/pages/forgot-password/ForgotPassword'
import ResetPassword from './components/pages/reset-password/ResetPassword'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/common/ProtectedRoute'
import PublicRoute from './components/common/PublicRoute'
import Browse from './components/pages/browse/Browse'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />


        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path='/browse' element={<Browse/>}/>
        </Route>

      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
