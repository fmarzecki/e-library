import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Notification from '../Alert/Notification';
import { postRequest } from '../utilities/api';
import moment from 'moment';

const RentalsHistory = () => {
    const [rentals, setRentals] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        filterBy: ''
    });
    const [rowCount, setRowCount] = useState(0);
    const [notification, setNotification] = useState(null);

    const fetchRentalsHistory = async () => {
        try {
            const endpoint = `/rentals/getHistory`;
            const response = await postRequest(endpoint, pagination);

            setRentals(response.data.data.rentals);
            setRowCount(response.data.data.rentals.length);

        } catch (error) {
            console.error('Error fetching rental history:', error);
            setRentals([]);
            setRowCount(0);
            setNotification({ message: 'Error fetching rental history', severity: 'error' });
        }
    };

    useEffect(() => {
        fetchRentalsHistory();
    }, [pagination]);

    const handlePaginationChange = (model) => {
        setPagination(prevState => ({
            ...prevState,
            page: model.page,
            size: model.pageSize,
        }));
    };

    return (
        <div>
            {notification && (
                <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
            )}
            <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%" }}>
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
                            pagination: { paginationModel: { pageSize: 5, page: 0 } }
                        }}
                        disableColumnSelector={true}
                        disableColumnFilter={true}
                        disableColumnMenu={true}
                        pageSizeOptions={[3, 5, 10]}
                        rows={rentals}
                        columns={[
                            { field: 'bookTitle', headerName: 'Tytuł', flex: 15, valueGetter: (params) => params.row.book.title },
                            { field: 'author', headerName: 'Autor', flex: 15, valueGetter: (params) => params.row.book.bookAuthor },
                            { field: 'rentalDate', headerName: 'Data wypożyczenia', flex: 10, valueGetter: (params) => moment(params.row.rentalDate).format('YYYY-MM-DD') },
                            { field: 'returnDate', headerName: 'Data zwrotu', flex: 10, valueGetter: (params) => moment(params.row.rentalReturnDate).format('YYYY-MM-DD') },
                        ]}
                        pagination
                        paginationMode="server"
                        rowCount={rowCount}
                        page={pagination.page}
                        pageSize={pagination.size}
                        rowsPerPageOptions={[3, 5, 10]}
                        onPaginationModelChange={handlePaginationChange}
                        getRowId={(row) => row.rentalId}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default RentalsHistory;
