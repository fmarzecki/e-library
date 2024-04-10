import React from 'react';
import {
    Typography, Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const rentalHistoryData = [
    { id: 1, bookName: 'Książka 3', rentalDate: '2024-03-20', returnDate: '2024-03-25' },
    { id: 2, bookName: 'Książka 4', rentalDate: '2024-03-22', returnDate: '2024-03-27' },
];

const customLocaleTextPl = {
    pagination: {
        labelRowsPerPage: 'Ilość wierszy:',
    },
};


const RentalsHistory = () => {
    return (
        <div>
            <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
                <Typography variant="h6" gutterBottom>
                    Historia wypożyczeń
                </Typography>
                <div>
                    <DataGrid
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
                        pageSizeOptions={[5, 10, 15]}

                        rows={rentalHistoryData}
                        columns={[
                            { field: 'bookName', headerName: 'Tytuł', flex: 2 },
                            { field: 'rentalDate', headerName: 'Data wypożyczenia', flex: 1 },
                            { field: 'returnDate', headerName: 'Data zwrotu', flex: 1 },
                        ]}

                        disableRowSelectionOnClick
                    />
                </div>
            </Paper>
        </div>
    );
};

export default RentalsHistory;