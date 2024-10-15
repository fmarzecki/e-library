import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Dashboard from '../Dashboard';

const UserDashboard = () => {
  const readerLinks = [
    { to: "/userDashboard/rentals", label: "Wypożyczenia", icon: BookmarkAddedIcon },
    { to: "/userDashboard/history", label: "Historia", icon: HistoryIcon },
    { to: "/userDashboard/account", label: "Konto", icon: AccountCircleIcon },
    { to: "/userDashboard/catalog", label: "Katalog", icon: MenuBookIcon },
    { to: "/userDashboard/news", label: "Ogłoszenia", icon: CircleNotificationsIcon },
  ];

  return <Dashboard userType="reader" buttons={readerLinks} />;
};

export default UserDashboard;
