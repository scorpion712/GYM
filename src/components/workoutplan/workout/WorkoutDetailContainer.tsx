import { Box, LinearProgress, Paper, Stack, Typography, SvgIcon } from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TimerIcon from '@mui/icons-material/Timer';

import { adaptGetWorkoutPlanToWorkoutPlan } from "../../../adapters";
import { useService } from "../../../hooks";
import { GetWorkoutPlanResponse, WorkoutPlanDetail } from "../../../models";
import { workoutService } from "../../../services";
import { primary } from "../../../theme/colors";
import { UserWorkoutWeek } from "../../users/workout/UserWorkoutWeek";

export const WorkoutDetailContainer = () => {
    const location = useLocation();
    const { loading, callEndpoint } = useService<GetWorkoutPlanResponse>();

    const [userWorkout, setUserWorkout] = useState<WorkoutPlanDetail | null>(null);

    const fetchUserWorkout = async (id: string) => {
        const response = await callEndpoint(await workoutService.getWorkoutPlan(id));
        if (response.data) {
            setUserWorkout(adaptGetWorkoutPlanToWorkoutPlan(response.data));
        }
    }

    useEffect(() => {
        if (location.state?.workoutId)
            fetchUserWorkout(location.state?.workoutId);
    }, [location.state])

    if (loading)
        return (
            <Box>
                <LinearProgress sx={{ mt: 5 }} />
            </Box>
        );

    if (!userWorkout) {
        return (
            <Paper sx={{ width: '100%', p: 2, height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack spacing={2}>
                    <Typography variant="h4" gutterBottom>
                        No se encontró plan de entrenamiento del usuario
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <Stack spacing={2}>
                <Typography variant="h4" gutterBottom>
                    {location.state?.username ?? ""} {userWorkout.name ? ` - ${userWorkout.name}` : ""}
                </Typography>

                <Stack direction={"row"} spacing={2}>
                    <SvgIcon>
                        <MyLocationIcon sx={{ color: primary.main }} />
                    </SvgIcon>
                    <Typography gutterBottom>
                        <span style={{ fontWeight: "bold" }}>{userWorkout.objective}</span>
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <SvgIcon>
                        <TimerIcon sx={{ color: primary.main }} />
                    </SvgIcon>
                    <Typography gutterBottom>
                        <span style={{ fontWeight: "bold" }}>{userWorkout.duration} semanas</span>
                    </Typography>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 4 }} justifyContent={'space-between'} >
                    <Stack direction={"row"} spacing={2}>
                        <SvgIcon>
                            <EventAvailableIcon />
                        </SvgIcon>
                        <Typography gutterBottom>
                            Inicio: <span style={{ fontWeight: "bold" }}>{format(userWorkout.initDate, "dd MMMM yyyy", { locale: es })}</span>
                        </Typography>
                        <SvgIcon>
                            <EventBusyIcon />
                        </SvgIcon>
                        <Typography gutterBottom>
                            Fin: <span style={{ fontWeight: "bold" }}>{userWorkout.endDate ? format(userWorkout.endDate, "dd MMMM yyyy", { locale: es }) : "-"}</span>
                        </Typography>
                    </Stack> 
                </Stack>
                <UserWorkoutWeek workouts={userWorkout.workouts} />
            </Stack>
        </Paper >
    );
}