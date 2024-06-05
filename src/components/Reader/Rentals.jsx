import React, { useState, useEffect } from 'react';
import {
  Typography, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import Notification from '../Alert/Notification';
import moment from 'moment';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    filterBy: ''
  });
  const [rowCount, setRowCount] = useState(0);
  const [selectedRowIds, setSelectedRowIds] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const userEmail = "ff@wp.pl";
  const [notification, setNotification] = useState(null);

  const addWeeks = (date, weeks) => {
    console.log(weeks)
    return moment(new Date(date)).add(parseInt(weeks), 'w').format('YYYY-MM-DD');
  };

  const fetchRentals = async () => {
    try {
      let apiKey = localStorage.getItem('apiKey')
      const response = await axios.post(`http://localhost:8080/worker/getAllRentalsForUser/email=${userEmail}/paginated/apiKey=${apiKey}`, pagination);
      const rentalsData = response.data.data.Rentals.content.map(rental => {
        try {
          const rentalReturnDate = addWeeks(rental.rentalDate, rental.timeOfRentalInWeeks);
          return {
            id: rental.rentalId,
            bookTitle: rental.bookCopy.book.title,
            rentalDate: rental.rentalDate,
            predictedReturnDate: rentalReturnDate, // Obliczanie przewidywanego czasu zwrotu
            status: rental.status,
            readerName: rental.reader.user.name,
            readerEmail: rental.reader.user.email,
            author: rental.bookCopy.book.bookAuthor,
            is_prolonged: rental.prolonged,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      }).filter(rental => rental !== null);
      setRentals(rentalsData);
      setRowCount(response.data.data.Rentals.totalElements);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      setRentals([]);
      setRowCount(0);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [pagination]);

  const handlePaginationChange = (model) => {
    setPagination(prevState => ({
        ...prevState,
        page: model.page,
        size: model.pageSize,
    }));
  };

  const handleProlongClick = async () => {
    try {
      let temp = {
        rentalId: selectedRowIds,
        prolongationInWeeks: 4,
      };
      let apiKey = localStorage.getItem('apiKey')
      await axios.patch(`http://localhost:8080/book/prolongateRental/apiKey=${apiKey}`, temp);
      setNotification({ message: 'Udało się prolongować książke.', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'Nie udało się prolongować książki', severity: 'warning' });
      console.error(error);
    }
  };

  return (
    <div>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%" }}>
        <Typography variant="h6" gutterBottom>
          Wypożyczone książki
        </Typography>
        <div>
          <DataGrid
            slotProps={{
              pagination: {
                labelRowsPerPage: 'Ilość wierszy:',
              }
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } }
            }}
            disableColumnSelector={true}
            disableColumnFilter={true}
            disableColumnMenu={true}
            pageSizeOptions={[3, 5, 10]}
            rows={rentals}
            columns={[
              { field: 'bookTitle', headerName: 'Tytuł', flex: 15 },
              { field: 'author', headerName: 'Autor', flex: 15 },
              { field: 'status', headerName: 'Status', flex: 10 },
              { field: 'rentalDate', headerName: 'Data wypożyczenia', flex: 10 },
              { field: 'predictedReturnDate', headerName: 'Termin zwrotu', flex: 10 },
              { field: 'is_prolonged', headerName: 'Czy prolongowana', flex: 10 },
            ]}
            pagination
            paginationMode="server"
            rowCount={rowCount}
            page={pagination.page}
            pageSize={pagination.size}
            rowsPerPageOptions={[3, 5, 10]}
            onPaginationModelChange={handlePaginationChange}
            getRowId={(row) => row.id}
            onRowSelectionModelChange={(newSelection) => {
              const selectedId = newSelection[0];
              setSelectedRowIds(selectedId);
              const selectedData = rentals.find(row => row.id === selectedId);
              setSelectedRowData(selectedData);
            }}
          />
        </div>
        <Button
          variant="outlined"
          color='secondary'
          onClick={handleProlongClick}
          disabled={!selectedRowData || selectedRowData.is_prolonged}
        >
          Prolonguj
        </Button>
      </Paper>
    </div>
  );
};

export default Rentals;
