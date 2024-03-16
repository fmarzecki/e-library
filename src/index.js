import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfilesPage from './components/test/ProfilesPage';
import NotFoundPage from './components/error/NotFoundPage';
import { Box, Container, CssBaseline } from '@mui/material';
import Clicker from './components/test/Clicker';

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
    path: '/clicker',
    element: <Clicker />,
  }
]);


root.render(
  <React.StrictMode>
    <CssBaseline/>
    <Container >
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);