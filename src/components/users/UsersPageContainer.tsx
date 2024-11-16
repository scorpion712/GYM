import { Paper, Typography, TableContainer, Table, TablePagination, OutlinedInput, InputAdornment, SvgIcon, Stack, Button } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

import { UserCustomer } from "../../models";
import { UsersTableBody, UsersTableHeader } from "./table";

const users = [
    {
        id: "1",
        firstName: "Ronnie",
        lastName: "Coleman",
        phone: "555-1234",
        email: "ronnie@yeahbuddy.com",
        age: "45",
        daysPerWeek: [true, true, true, true, true],
        lastPaidDate: 1679043200000,
    } as UserCustomer,
    {
        id: "2",
        firstName: "Cris",
        lastName: "Bumstead",
        phone: "555-1234",
        email: "cris@cbum.com",
        age: "29",
        daysPerWeek: [true, true, true, true, true],
        lastPaidDate: 1679043200000,
    } as UserCustomer
];

export const UsersPageContainer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length >= 3) {
            setSearch(e.target.value)
        }
        if (e.target.value.length == 0) setSearch("");
    }

    const handleShowAllCustomers = () => {
        console.log("show all customers -> service.getAll(true)")
    }

    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Clientes
            </Typography>
            <Stack direction="row"
                spacing={2}
                sx={{ mt: 2, mb: 3 }}>
                <OutlinedInput
                    placeholder="Buscar clientes"
                    startAdornment={
                        <InputAdornment position="start">
                            <SvgIcon>
                                <SearchIcon />
                            </SvgIcon>
                        </InputAdornment>
                    }
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1 }}
                />
                <Button variant="outlined" color="info" onClick={handleShowAllCustomers}>Ver Eliminados</Button>
            </Stack>
            <TableContainer sx={{ maxHeight: 640 }}>
                <Table>
                    <UsersTableHeader />
                    <UsersTableBody users={users.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase()) || user.lastName?.toLowerCase().includes(search.toLowerCase()))} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Clientes por página"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
        </Paper >
    )
}