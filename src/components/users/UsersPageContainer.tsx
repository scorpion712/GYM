import { Paper, Typography, TableContainer, Table, TablePagination, OutlinedInput, InputAdornment, SvgIcon, Stack, Button, Box, LinearProgress } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

import { GetAllUsersResponse, UserCustomer } from "../../models";
import { UsersTableBody, UsersTableHeader } from "./table";
import { useAsync, useRouter, useService } from "../../hooks";
import { userService } from "../../services";
import { adaptGetAllCustomersToCustomers } from "../../adapters";
import { paths } from "../../routes/paths";
import { primary } from "../../theme/colors";


export const UsersPageContainer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<UserCustomer[]>([]);
    const [usersTotal, setUsersTotal] = useState(0);
    const { loading, callEndpoint } = useService<GetAllUsersResponse>();

    const router = useRouter();

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

    const handleCreateCustomer = () => {
        router.push(paths.users.create);
    }

    const fetchUsers = async () => await callEndpoint(await userService.getAll());

    const handleFetchUsersResponse = (data: GetAllUsersResponse) => {
        setUsers(adaptGetAllCustomersToCustomers(data));
        setUsersTotal(data.total);
    }

    useAsync(fetchUsers, handleFetchUsersResponse);

    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Clientes
            </Typography>
            {
                loading ?
                    <Box>
                        <LinearProgress sx={{ mt: 5 }} />
                    </Box>
                    :
                    <>

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
                            <Button variant="contained" sx={{ backgroundColor: primary.lightest, '&:hover': {backgroundColor: primary.main}}} onClick={handleCreateCustomer}>Nuevo</Button>
                            <Button sx={{ display: "none"}} variant="outlined" color="info" onClick={handleShowAllCustomers}>Ver Eliminados</Button>
                        </Stack>
                        <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
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
                            labelDisplayedRows={({ from, to }) => `${from}-${to} de ${usersTotal}`}
                        />
                    </>
            }
        </Paper >
    )
}