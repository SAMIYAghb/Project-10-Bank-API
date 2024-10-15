import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './components/BaseLayout/BaseLayout'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import Profile from './pages/Profile/Profile'
import Signup from './components/Signup/Signup'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile /> {/* Page protégée */}
                </ProtectedRoute>
              }
            />
            {/* <Route 
          path="/edit-name" 
          element={
            <ProtectedRoute>
              <EditName /> 
            </ProtectedRoute>
          } 
          /> */}
            {/* <Route path="*" element={<Error />} />
          <Route path="/error" element={<Error />} /> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App

