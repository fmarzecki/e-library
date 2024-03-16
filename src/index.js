import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfilesPage from './components/test/ProfilesPage';
import NotFoundPage from './components/error/NotFoundPage';
import { Box, Container, CssBaseline } from '@mui/material';
import Clicker from './components/test/Clicker';
import Dashboard from './components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Clicker/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/profiles',
    element: <ProfilesPage/>
  },
  {
    path: '/lib',
    element: <Dashboard />,
  }
]);

root.render(
  <React.StrictMode>
    <CssBaseline/>
      <RouterProvider router={router} />
  </React.StrictMode>
);