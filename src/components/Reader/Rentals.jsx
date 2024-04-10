import React, { useState } from 'react';
import {
  Typography, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';


// Stałe wartości wypożyczeń i historii wypożyczeń
const currentRentalsData = [
  { id: 1, bookName: 'Książka 1', rentalDate: '2024-04-03', returnToDate: '2024-05-03' },
  { id: 2, bookName: 'Książka 2', rentalDate: '2024-04-10', returnToDate: '2024-05-10' },
  { id: 3, bookName: 'Książka 3', rentalDate: '2024-04-11', returnToDate: '2024-05-11' },
];

const Rentals = () => {

  // Obsluga wybranego wiersza
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const handleProlongClick = () => {
    // Tutaj możesz wykonać odpowiednie działania na wybranych wierszach
    console.log('Prolonguj działanie dla wierszy:', selectedRowIds);
  };

  return (
    <div>
      <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
        <Typography variant="h6" gutterBottom>
          Wypożyczone książki
        </Typography>
        <div>
          <DataGrid
            // Wyglad
            slotProps={{
              pagination: {
                labelRowsPerPage: 'Ilość wierszy:',
              }
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            disableColumnSelector={true}
            disableColumnFilter={true}
            disableColumnMenu={true}
            disableMultipleRowSelection={true}
            pageSizeOptions={[5, 10, 15]}

            // Dane
            columns={[
              { field: 'bookName', headerName: 'Tytuł', flex: 2 },
              { field: 'rentalDate', headerName: 'Data wypożyczenia', flex: 1 },
              { field: 'returnToDate', headerName: 'Termin zwrotu', flex: 1 },
            ]}
            rows={currentRentalsData}

            // Obsługa wybranego wiersza
            onRowSelectionModelChange={(id) => setSelectedRowIds(id)}

          />
        </div>
        <Button
          variant="outlined" a
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