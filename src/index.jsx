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
import EmployeeDashboard from './components/Employee/EmployeeDashboard'
import ManageNews from './components/Employee/ManageNews';
import AddWorker from './components/Administrator/AddWorker';
import ManageRentals from './components/Employee/ManageRentals';
import ManageReservations from './components/Employee/ManageReservations';
import NoAccess from './components/error/NoAccess'
import ProtectedRoute from './components/ProtectedRoute'
import { RolesEnum } from './components/utilities/rolesEnum';
import UsersList from './components/Administrator/UsersList';

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
    path: '/noaccess',
    element: <NoAccess />,
  },
  {
    path: '/userDashboard',
    element:
      <ProtectedRoute allowedRoles={RolesEnum.USER} >
        <UserDashboard />
      </ProtectedRoute >,
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
    element:
      <ProtectedRoute allowedRoles={RolesEnum.EMPLOYEE} >
        <EmployeeDashboard />
      </ProtectedRoute >,
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
    element:
      <ProtectedRoute allowedRoles={RolesEnum.ADMIN} >
        <AdministratorDashboard />
      </ProtectedRoute >,
    children: [
      {
        path: '/administratorDashboard/workers',
        element: <WorkersList />,
      },
      {
        path: '/administratorDashboard/addWorker',
        element: <AddWorker />,
      },
      {
        path: '/administratorDashboard/usersList',
        element: <UsersList />,
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