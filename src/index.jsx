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
import EmployeeDashboard from './components/Employee/EmployeeDashboard'
import ManageNews from './components/Employee/ManageNews';
import AddWorker from './components/EmployeeManager/AddWorker';
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
    ],
  }, 

  {
    path: '/warehouseManagerDashboard',
    element: <BookManagerDashboard />,
    children: [
      {
        path: '/warehouseManagerDashboard/addBook',
        element: <AddBookForm />,
      },
      {
        path: '/warehouseManagerDashboard/books',
        element: <ManageBooks />,
      },
      {
        path: '/warehouseManagerDashboard/catalog',
        element: <Catalog />,
      },
      {
        path: '/warehouseManagerDashboard/rentals',
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
      {
        path: '/employeeManagerDashboard/addWorker',
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