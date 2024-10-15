import React from 'react';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HistoryIcon from '@mui/icons-material/History';
import Dashboard from '../Dashboard';

const AdministratorDashboard = () => {
  const readerLinks = [
    { to: "/administratorDashboard/workers", label: "Lista Pracowników", icon: BookmarkAddedIcon },
    { to: "/administratorDashboard/managers", label: "Lista Managerów", icon: HistoryIcon },
    { to: "/administratorDashboard/addWorker", label: "Dodaj Pracownika", icon: HistoryIcon }
  ];

  return <Dashboard userType="reader" links={readerLinks} />;
};

export default AdministratorDashboard;