import React, { useState, useEffect } from 'react';
import {
  Typography, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import Notification from '../Alert/Notification';
import moment from 'moment';
import { postRequest } from '../utilities/api';

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
  const [notification, setNotification] = useState(null);

  const fetchRentals = async () => {
    try {
      const endpoint = '/rentals/getRentals'
      const response = await postRequest(endpoint, pagination)
      console.log(response.data.data.rentals)
      console.log(response.data.data.rentals.length)
      setRentals(response.data.data.rentals);
      setRowCount(response.data.data.rentals.length);
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
      // in progress implementation
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
              { field: 'title', headerName: 'Tytuł', flex: 15, valueGetter: (params) => params.row.book.title },
              { field: 'bookAuthor', headerName: 'Autor', flex: 15, valueGetter: (params) => params.row.book.bookAuthor },
              { field: 'status', headerName: 'Status', flex: 10 },
              { field: 'rentalDate', headerName: 'Data wypożyczenia', flex: 10, valueGetter: (params) => moment(params.row.rentalDate).format('YYYY-MM-DD') },
              { field: 'returnDateExpected', headerName: 'Termin zwrotu', flex: 10, valueGetter: (params) => moment(params.row.returnDateExpected).format('YYYY-MM-DD') },
            ]}
            pagination
            paginationMode="server"
            rowCount={rowCount}
            page={pagination.page}
            pageSize={pagination.size}
            rowsPerPageOptions={[3, 5, 10]}
            onPaginationModelChange={handlePaginationChange}
            getRowId={(row) => row.rentalId}
            onRowSelectionModelChange={(newSelection) => {
              const selectedId = newSelection[0];
              setSelectedRowIds(selectedId);
              const selectedData = rentals.find(row => row.rentalId === selectedId);
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
