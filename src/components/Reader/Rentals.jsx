import React, { useState, useEffect } from 'react';
import {
  Typography, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    filterBy: 'active'
  });
  const [rowCount, setRowCount] = useState(0);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const userEmail = "ff@wp.pl";

  const fetchRentals = async () => {
    try {
      console.log(pagination);
      const response = await axios.post(`http://localhost:8080/worker/getAllRentalsForUser/email=${userEmail}/paginated`, pagination);
      const rentalsData = response.data.data.Rentals.content.map(rental => ({
        id: rental.rentalId,
        bookTitle: rental.bookCopy.book.title,
        rentalDate: rental.rentalDate,
        rentalReturnDate: rental.rentalReturnDate,
        status: rental.status,
        readerName: rental.reader.user.name,
        readerEmail: rental.reader.user.email,
        author: rental.bookCopy.book.bookAuthor
      }));
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

  const handleProlongClick = () => {
    // Tutaj możesz wykonać odpowiednie działania na wybranych wierszach
    console.log('Prolonguj działanie dla wierszy:', selectedRowIds);
  };

  return (
    <div>
      <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%" }}>
        <Typography variant="h6" gutterBottom>
          Wypożyczone książki
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
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
              { field: 'rentalReturnDate', headerName: 'Data zwrotu', flex: 10 },
            ]}
            pagination
            paginationMode="server"
            rowCount={rowCount}
            page={pagination.page}
            pageSize={pagination.size}
            rowsPerPageOptions={[3, 5, 10]}
            onPaginationModelChange={handlePaginationChange}
            getRowId={(row) => row.id}
            onRowSelectionModelChange={(newSelection) => setSelectedRowIds(newSelection)}
          />
        </div>
        <Button
          variant="outlined"
          color='secondary'
          onClick={handleProlongClick}
          disabled={selectedRowIds.length !== 1}
        >
          Prolonguj
        </Button>
      </Paper>
    </div>
  );
};

export default Rentals;
