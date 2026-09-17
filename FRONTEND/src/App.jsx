import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import SignOut from '../components/SignOut'
import Dashboard from '../components/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'
import Home from '../components/Home'

const App = () => {

  const router = createBrowserRouter([
    {path:"/",
      element:<Home/>
    },
  {
    path:"/sign-in",
    element:<SignIn/>,  
  },
  {
    path:"/sign-up",
    element:<SignUp/>
  },
  {
    path:"/sign-out",
    element:<SignOut />
  },
  {
    path:"/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>,  
  },
  {
    path:"/reset-password",
    element:<ResetPassword/>,  
  },
])

  return (
      
    <RouterProvider router={router}>
      <div>
        <h1>
          Welcome to the page
        </h1>
        </div>
    </RouterProvider>

  )
}

export default App