import { Box, LinearProgress, Paper, Table, TableContainer, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuth, useService } from "../../.././../hooks";
import { workoutService } from "../../.././../services";
import { GetHistoricWorkoutPlansResponse } from "../../.././../models";
import { WorkoutHistory } from "../../../../models";
import { adaptGetUserWorkoutHistoryToWorkoutHistory } from "../../../../adapters";
import { HistoricWorkoutsTableBody, HistoricWorkoutstTableHeader } from "./table";

export const UserWorkoutHistoryContainer = () => {
    const location = useLocation();
    const { loading, callEndpoint } = useService<GetHistoricWorkoutPlansResponse>();

    const [workouts, setWorkouts] = useState<WorkoutHistory[]>([]);
    const [workoutsTotal, setWorkoutsTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { user } = useAuth();

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchWorkouts = async (id: string) => {
        const response = await callEndpoint(await workoutService.getHistoricWorkoutPlans(id));
        if (response.data) {
            setWorkouts(adaptGetUserWorkoutHistoryToWorkoutHistory(response.data));
            setWorkoutsTotal(response.data.total);
        }
    }

    useEffect(() => {
        fetchWorkouts(location.state?.userId ?? user!.id);
    }, [location.state])

    if (loading)
        return (
            <Box>
                <LinearProgress sx={{ mt: 5 }} />
            </Box>
        );

    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
                <Table>
                    <HistoricWorkoutstTableHeader />
                    <HistoricWorkoutsTableBody workouts={workouts} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={workoutsTotal}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Planes por página"
                labelDisplayedRows={({ from, to }) => `${from}-${to} de ${workoutsTotal}`}
            />
        </Paper >
    )
}