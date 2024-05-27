import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import ProfilesPage from './components/test/ProfilesPage';
import NotFoundPage from './components/error/NotFoundPage';
import Clicker from './components/test/Clicker';
import ReaderDashboard from './components/Reader/ReaderDashboard';
import News from './components/Reader/News';
import Account from './components/Reader/Account';
import Catalog from './components/Reader/Catalog';
import Rentals from './components/Reader/Rentals';
import RentalsHistory from './components/Reader/RentalsHistory';
import LoginSignup from './components/Authentication/LoginSignup';
import BookManagerDashboard from './components/BookManager/BookManagerDashboard';
import AddBookForm from './components/BookManager/AddBookForm';
import ManageBooks from './components/BookManager/ManageBooks';
import WorkersList from './components/EmployeeManager/WorkersList';
import EmployeeManagerDashboard from './components/EmployeeManager/EmployeeManagerDashboard';
import WarehouseManagersList from './components/EmployeeManager/WarehouseManagerList';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReaderDashboard />,
    errorElement: <NotFoundPage />
  },

  {
    path: '/profiles',
    element: <ProfilesPage />
  },

  {
    path: '/clicker',
    element: <Clicker />,

  },
  {
    path: '/authentication',
    element: <LoginSignup />,

  },

  {
    path: '/readerDashboard',
    element: <ReaderDashboard />,
    children: [
      {
        path: '/readerDashboard/news',
        element: <News />,
      },
      {
        path: '/readerDashboard/account',
        element: <Account />,
      },
      {
        path: '/readerDashboard/catalog',
        element: <Catalog />,
      },
      {
        path: '/readerDashboard/rentals',
        element: <Rentals />,
      },
      {
        path: '/readerDashboard/history',
        element: <RentalsHistory />,
      }
    ],
  }, 

  {
    path: '/bookManagerDashboard',
    element: <BookManagerDashboard />,
    children: [
      {
        path: '/bookManagerDashboard/addBook',
        element: <AddBookForm />,
      },
      {
        path: '/bookManagerDashboard/books',
        element: <ManageBooks />,
      },
      {
        path: '/bookManagerDashboard/catalog',
        element: <Catalog />,
      },
      {
        path: '/bookManagerDashboard/rentals',
        element: <Rentals />,
      },
    ]
  },
  {
    path: '/employeeManagerDashboard',
    element: <EmployeeManagerDashboard />,
    children: [
      {
        path: '/employeeManagerDashboard/workers',
        element: <WorkersList/>,
      },
      {
        path: '/employeeManagerDashboard/managers',
        element: <WarehouseManagersList />,
      },
    ]
  }

]);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);