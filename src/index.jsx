import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';

import ProfilesPage from './components/test/ProfilesPage';
import NotFoundPage from './components/error/NotFoundPage';
import Clicker from './components/test/Clicker';
import Dashboard from './components/Dashboard';
import News from './components/News';
import Account from './components/Account';
import Catalog from './components/Catalog';
import Rentals from './components/Rentals';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    errorElement: <NotFoundPage/>
  },

  {
    path: '/profiles',
    element: <ProfilesPage/>
  },

  {
    path: '/clicker',
    element: <Clicker />,

  },

  {
    path: '/dashboard',
    element: <Dashboard/>,
    children: [
      {
        path: '/dashboard/news',
        element: <News />,
      }, 
      {
        path: '/dashboard/account',
        element: <Account />,
      },
      {
        path: '/dashboard/catalog',
        element: <Catalog />,
      }, 
      {
        path: '/dashboard/rentals',
        element: <Rentals />,
      }
    ],
  }
]);

root.render(
  <React.StrictMode>
    <CssBaseline/>
      <RouterProvider router={router} />
  </React.StrictMode>
);