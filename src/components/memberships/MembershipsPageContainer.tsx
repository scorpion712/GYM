import { Paper, Typography, Box, LinearProgress, Stack, OutlinedInput, InputAdornment, SvgIcon, TableContainer, Table, TablePagination } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

import { membershipService } from "../../services";
import { useService, useAsync } from "../../hooks";
import { GetMembershipsResponse, Membership } from "../../models";
import { adaptGetMemberships } from "../../adapters";
import { MembershipsTableBody, MembershipsTableHeader } from "./table";

export const MembershipsPageContainer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [membershipsTotal, setWorkoutsTotal] = useState(0);
    const { loading, callEndpoint } = useService<GetMembershipsResponse>();

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
    const fetchMemberships = async () => await callEndpoint(await membershipService.getAll());

    const handleFetchWorkoutPlansResponse = (data: GetMembershipsResponse) => {
        if (!data) return;
        setMemberships(adaptGetMemberships(data));
        setWorkoutsTotal(data.total);
    }

    useAsync(fetchMemberships, handleFetchWorkoutPlansResponse);

    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Membresías de clientes
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
                                placeholder="Buscar nombre del cliente"
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
                        </Stack>
                        <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
                            <Table>
                                <MembershipsTableHeader />
                                <MembershipsTableBody memberships={
                                    memberships
                                        .filter(membership => membership.userName.toLowerCase().includes(search.toLowerCase()))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                } />
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={memberships.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Membresías por página"
                            labelDisplayedRows={({ from, to }) => `${from}-${to} de ${membershipsTotal}`}
                        />
                    </>
            }
        </Paper >
    );
}