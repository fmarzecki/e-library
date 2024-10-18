import React, { useState, useEffect } from 'react';
import {
    Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Notification from '../Alert/Notification';
import { postRequest, putRequest } from '../utilities/api';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        filterBy: ''
    });
    const [rowCount, setRowCount] = useState(0);
    const [selectedRowIds, setSelectedRowIds] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [notification, setNotification] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const fetchUsers = async () => {
        try {
            const endpoint = '/users/getUsersPaginated';
            const response = await postRequest(endpoint, pagination);
            setUsers(response.data.data.users);
            setRowCount(response.data.data.users.length * response.data.data.totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
            setRowCount(0);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [pagination]);

    const handlePaginationChange = (model) => {
        setPagination(prevState => ({
            ...prevState,
            page: model.page,
            size: model.pageSize,
        }));
    };

    const handleOpenDialog = () => {
        if (selectedRowData) {
            setOpenDialog(true);
        } else {
            setNotification({ message: 'Wybierz użytkownika, aby zmienić hasło.', severity: 'warning' });
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setNotification({ message: 'Hasła są niezgodne!', severity: 'warning' });
        } else {
            try {
                const endpoint = '/users/updatePasswordForUser';
                const requestBody = { userId: selectedRowIds, password: confirmPassword };
                const response = await putRequest(endpoint, requestBody);
                if (response.status === 200) {
                    setNotification({ message: 'Hasło zmienione!', severity: 'success' });
                } else {
                    setNotification({ message: 'Błąd odpowiedzi serwera!', severity: 'warning' });
                }
                handleCloseDialog();
            } catch (error) {
                setNotification({ message: 'Błąd!', severity: 'warning' });
            }
        }
    };

    return (
        <div>
            {notification && (
                <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
            )}
            <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%" }}>
                <Typography variant="h6" gutterBottom>
                    Lista użytkowników
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
                        disableColumnSelector
                        disableColumnFilter
                        disableColumnMenu
                        rows={users}
                        columns={[
                            { field: 'id', headerName: 'Id', flex: 15 },
                            { field: 'name', headerName: 'Imię', flex: 15 },
                            { field: 'surname', headerName: 'Nazwisko', flex: 10 },
                            { field: 'email', headerName: 'Email', flex: 10 },
                            { field: 'role', headerName: 'Rola', flex: 10 },
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
                            const selectedData = users.find(row => row.id === selectedId);
                            setSelectedRowData(selectedData);
                        }}
                    />
                </div>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleOpenDialog}
                    disabled={!selectedRowData}
                >
                    Zmień hasło
                </Button>
            </Paper>

            {/* Password Change Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Zmień hasło</DialogTitle>
                <DialogContent>
                    {notification && (
                        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nowe hasło"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Potwierdź nowe hasło"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleChangePassword} color="primary">
                        Zmień hasło
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UsersList;
