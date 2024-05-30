import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const RentalsHistory = () => {
    const [rentals, setRentals] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
    });
    const [rowCount, setRowCount] = useState(0);

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
        setPagination({
            page: model.page,
            size: model.pageSize,
        });
    };

    return (
        <div>
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
                            { field: 'id', headerName: 'ID', width: 90 },
                            { field: 'bookTitle', headerName: 'Book Title', width: 150 },
                            { field: 'rentalDate', headerName: 'Rental Date', width: 150 },
                            { field: 'rentalReturnDate', headerName: 'Return Date', width: 150 },
                            { field: 'status', headerName: 'Status', width: 100 },
                            { field: 'readerName', headerName: 'Reader Name', width: 150 },
                            { field: 'readerEmail', headerName: 'Reader Email', width: 200 },
                            { field: 'author', headerName: 'Author', width: 150 },
                        ]}
                        pagination
                        paginationMode="server"
                        rowCount={rowCount}
                        page={pagination.page}
                        pageSize={pagination.size}
                        rowsPerPageOptions={[3, 5, 10]}
                        onPaginationModelChange={handlePaginationChange}
                        getRowId={(row) => row.id}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default RentalsHistory;
