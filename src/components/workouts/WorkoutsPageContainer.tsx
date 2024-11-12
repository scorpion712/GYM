import { Box, Button, InputAdornment, LinearProgress, OutlinedInput, Paper, Stack, SvgIcon, Table, TableContainer, TablePagination, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useAsync, useRouter, useService } from "../../hooks";
import { paths } from "../../routes/paths";
import { WorkoutsTableHeader } from "./table/WorkoutPlanTableHeader";
import { GetWorkoutPlansResponse, Workout, WorkoutPlan } from "../../models";
import { workoutService } from "../../services";
import { adaptGetWorkoutPlansToWorkoutPlan } from "../../adapters";
import { WorkoutsTableBody } from "./table/WorkoutPlanTableBody";

const mockedWorkoutPlans = [
    {
        id: "1",
        name: "Hipertrofia",
        objective: "Aumento de Hipertrofia",
        duration: 4,
        initDate: new Date(),
        endDate: new Date(),
        assignedUsers: [ 

        ],
        workouts: [
            {
                id: "1",
                week: 1,
                day: 1,
                description: "Upper body workout",
                exercise: [
                    { id: "1", name: "Bench Press", series: 3, repetitions: 10, weight: 70, rir: 2, rpe: 8, comments: "Felt strong" },
                    { id: "2", name: "Pull-ups", series: 3, repetitions: 8, weight: 0, rir: 1, rpe: 9, comments: "Need to improve" }
                ]
            },
            {
                id: "2",
                week: 1,
                day: 2,
                description: "Lower body workout",
                exercise: [
                    { id: "3", name: "Squats", series: 3, repetitions: 10, weight: 90, rir: 2, rpe: 8, comments: "Good form" },
                    { id: "4", name: "Leg Press", series: 3, repetitions: 10, weight: 120 },
                ]
            },
            {
                id: "3",
                week: 2,
                day: 1,
                description: "Full body workout",
                exercise: [
                    { id: "5", name: "Deadlift", series: 3, repetitions: 5, weight: 100, rir: 1, rpe: 9, comments: "Challenging" }
                ]
            }] as Workout[]
    } as WorkoutPlan
];

export const WorkoutsPageContainer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(mockedWorkoutPlans);
    const [workoutsTotal, setWorkoutsTotal] = useState(0);
    const { loading, callEndpoint } = useService<GetWorkoutPlansResponse>();

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

    const handleCreateWorkoutPlan = () => {
        router.push(paths.users.create);
    }

        const fetchWorkoutPlans = async () => await callEndpoint(await workoutService.getAll());

    const handleFetchWorkoutPlansResponse = (data: GetWorkoutPlansResponse) => {
        setWorkoutPlans(adaptGetWorkoutPlansToWorkoutPlan(data));
        setWorkoutsTotal(data.total);
    }

    useAsync(fetchWorkoutPlans, handleFetchWorkoutPlansResponse);

    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Planes de Entrenamiento
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
                                placeholder="Buscar planes por nombre u objetivo"
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
                            <Button variant="contained" color="success" onClick={handleCreateWorkoutPlan}>Nuevo</Button> 
                        </Stack>
                        <TableContainer sx={{ maxHeight: 640 }}>
                            <Table>
                                <WorkoutsTableHeader />
                                <WorkoutsTableBody workoutPlans={workoutPlans.filter(workout => workout.name.toLowerCase().includes(search.toLowerCase()) || workout.objective?.toLowerCase().includes(search.toLowerCase()))} />
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={workoutPlans.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Planes por página"
                            labelDisplayedRows={({ from, to }) => `${from}-${to} de ${workoutsTotal}`}
                        />
                    </>
            }
        </Paper >
    )
}