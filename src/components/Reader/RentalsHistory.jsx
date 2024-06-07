import React, { useState, useEffect } from 'react';
import { Typography, Paper, Rating } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const RentalsHistory = () => {
    const [rentals, setRentals] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        filterBy: 'inactive'
    });
    const [rowCount, setRowCount] = useState(0);
    const [selectedRating, setSelectedRating] = useState({});
    let user = JSON.parse(localStorage.getItem('user'))
    let userEmail = user.user.user.email;
    
    const fetchRentals = async () => {
        try {
            let apiKey = localStorage.getItem('apiKey');
            const response = await axios.post(`http://localhost:8080/worker/getAllRentalsForUser/email=${userEmail}/paginated/apiKey=${apiKey}`, pagination);
            const rentalsData = response.data.data.Rentals.content.map(rental => ({
                id: rental.rentalId,
                bookTitle: rental.bookCopy.book.title,
                rentalDate: rental.rentalDate,
                rentalReturnDate: rental.rentalReturnDate,
                status: rental.status,
                readerName: rental.reader.user.name,
                readerEmail: rental.reader.user.email,
                author: rental.bookCopy.book.bookAuthor,
                bookId: rental.bookCopy.book.bookId,
                rating: rental.bookCopy.book.averageBookRating || 0 // Assuming rating is part of book data
            }));
            setRentals(rentalsData);
            setRowCount(response.data.data.Rentals.totalElements);
        } catch (error) {
            console.error('Error fetching rentals:', error);
            setRentals([]);
            setRowCount(0);
        }
    };

    const handleRatingChange = async (newRating, bookId) => {
        try {
            const apiKey = localStorage.getItem('apiKey');
            const bookRatingForm = {
                rating: newRating,
                bookId: bookId
            };
            await axios.post(`http://localhost:8080/book/addOrUpdateBookRating/apiKey=${apiKey}`, bookRatingForm);
            setSelectedRating((prev) => ({ ...prev, [bookId]: newRating }));
            fetchRentals(); // Refresh rentals to show updated ratings
        } catch (error) {
            console.error('Error updating rating:', error);
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
                            { field: 'bookTitle', headerName: 'Tytuł', flex: 15 },
                            { field: 'author', headerName: 'Autor', flex: 15 },
                            { field: 'rentalDate', headerName: 'Data wypożyczenia', flex: 10 },
                            { field: 'rentalReturnDate', headerName: 'Data zwrotu', flex: 10 },
                            {
                                field: 'rating', headerName: 'Ocena', flex: 10, renderCell: (params) => (
                                    <Rating
                                        name={`rating-${params.row.bookId}`}
                                        value={selectedRating[params.row.bookId] || params.row.rating}
                                        onChange={(event, newValue) => handleRatingChange(newValue, params.row.bookId)}
                                    />
                                )
                            }
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
