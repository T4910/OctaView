import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import ErrorPage from './Error-page'
import Login from './components/login/Index'
import Staff from './components/staff/Index'
import AdminLayout from './components/admin/Layout'
import AdminTimetables from './components/admin/show-timetables/index'
import AdminDisplayTimetable from './components/admin/show-timetables/displayTimetable'
import AdminSettings from './components/admin/settings/Index'
import NewTimetable from "./components/admin/new-timetable-config/Index"
import AdminViews from "./components/admin/settings/general/Index"
import AdminAddAi from "./components/admin/settings/aikey"
import AdminConfigTimetables from "./components/admin/settings/timetableConfigs"

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
    path: '/admin/new-timetable',
    element: <NewTimetable />,
    errorElement: <ErrorPage />
  },
  {
    path: '/admin',
    element: <AdminLayout />, // Wrap Admin component with layout
    children: [
      { 
        index: true, 
        element: <AdminTimetables />
      }, // Default admin page
      { 
        path: 'timetable', 
        element:  <Navigate to="/admin/" replace />
      },
      { 
        path: 'timetable/:id', 
        element: <AdminDisplayTimetable /> 
      },
      { 
        path: 'settings', 
        element: <AdminSettings />,
        children: [
          { 
            index: true, 
            element: <AdminViews />
          }, // Default admin page
          { 
            path: 'add-AI-key', 
            element: <AdminAddAi /> 
          },
          { 
            path: 'configure-timetables', 
            element: <AdminConfigTimetables /> 
          },

        ]
      },
    ],
    errorElement: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
