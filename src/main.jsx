import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import ErrorPage from './Error-page'
import Login from './components/login/Index'
import Staff from './components/staff/Index'
import Admin from './components/admin/Index'
import NewTimetable from "./components/admin/new-timetable-config/Index"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/faculty',
    element: <Staff />,
    errorElement: <ErrorPage />
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <ErrorPage />
  },
  {
    path: '/admin/new-timetable',
    element: <NewTimetable />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
