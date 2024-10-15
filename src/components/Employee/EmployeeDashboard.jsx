import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HistoryIcon from '@mui/icons-material/History';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Dashboard from '../Dashboard';

const EmployeeDashboard = () => {
  const employeeLinks = [
    { to: "/employeeDashboard/manageReservations", label: "Rezerwacje", icon: BookmarkAddedIcon },
    { to: "/employeeDashboard/manageRentals", label: "Wypożyczenia", icon: MenuBookIcon },
    { to: "/employeeDashboard/manageNews", label: "Ogłoszenia", icon: CircleNotificationsIcon },
    { to: "/employeeDashboard/books", label: "Książki", icon: BookmarkAddedIcon },
    { to: "/employeeDashboard/addBook", label: "Dodaj Książkę", icon: HistoryIcon }
  ];

  return <Dashboard userType="worker" links={employeeLinks} />;
};

export default EmployeeDashboard;
