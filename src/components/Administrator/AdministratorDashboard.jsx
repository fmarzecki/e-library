import React from 'react';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HistoryIcon from '@mui/icons-material/History';
import Dashboard from '../Dashboard';

const AdministratorDashboard = () => {
  const readerLinks = [
    { to: "/administratorDashboard/workers", label: "Lista Pracowników", icon: BookmarkAddedIcon },
    { to: "/administratorDashboard/addWorker", label: "Dodaj Pracownika", icon: HistoryIcon }
  ];

  return <Dashboard userType="reader" buttons={readerLinks} />;
};

export default AdministratorDashboard;