import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import NotFoundPage from './components/error/NotFoundPage';
import UserDashboard from './components/User/UserDashboard';
import News from './components/User/News';
import Account from './components/User/Account';
import Catalog from './components/User/Catalog';
import Rentals from './components/User/Rentals';
import RentalsHistory from './components/User/RentalsHistory';
import LoginSignup from './components/Authentication/LoginSignup';
import AddBookForm from './components/Employee/AddBookForm';
import ManageBooks from './components/Employee/ManageBooks';
import WorkersList from './components/Administrator/WorkersList';
import AdministratorDashboard from './components/Administrator/AdministratorDashboard';
import WarehouseManagersList from './components/Administrator/WarehouseManagerList';
import EmployeeDashboard from './components/Employee/EmployeeDashboard'
import ManageNews from './components/Employee/ManageNews';
import AddWorker from './components/Administrator/AddWorker';
import ManageRentals from './components/Employee/ManageRentals';
import ManageReservations from './components/Employee/ManageReservations';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignup />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/authentication',
    element: <LoginSignup />,

  },

  {
    path: '/userDashboard',
    element: <UserDashboard />,
    children: [
      {
        path: '/userDashboard/news',
        element: <News />,
      },
      {
        path: '/userDashboard/account',
        element: <Account />,
      },
      {
        path: '/userDashboard/catalog',
        element: <Catalog />,
      },
      {
        path: '/userDashboard/rentals',
        element: <Rentals />,
      },
      {
        path: '/userDashboard/history',
        element: <RentalsHistory />,
      }
    ],
  },

  {
    path: '/employeeDashboard',
    element: <EmployeeDashboard />,
    children: [
      {
        path: '/employeeDashboard/manageNews',
        element: <ManageNews />,
      },
      {
        path: '/employeeDashboard/manageReservations',
        element: <ManageReservations />,
      },
      {
        path: '/employeeDashboard/manageRentals',
        element: <ManageRentals />,
      },
      {
        path: '/employeeDashboard/addBook',
        element: <AddBookForm />,
      },
      {
        path: '/employeeDashboard/books',
        element: <ManageBooks />,
      },
    ],
  },
  {
    path: '/administratorDashboard',
    element: <AdministratorDashboard />,
    children: [
      {
        path: '/administratorDashboard/workers',
        element: <WorkersList />,
      },
      {
        path: '/administratorDashboard/managers',
        element: <WarehouseManagersList />,
      },
      {
        path: '/administratorDashboard/addWorker',
        element: <AddWorker />,
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