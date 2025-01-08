import { Box, Button, LinearProgress, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TimerIcon from '@mui/icons-material/Timer';

import { useRouter, useService } from "../../../hooks";
import { workoutService } from "../../../services";
import { useLocation } from "react-router-dom";
import { GetUserWorkoutResponse, UserWorkout } from "../../../models";
import { UserWorkoutWeek } from "./UserWorkoutWeek";
import { primary } from "../../../theme/colors";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { adaptGetUserWorkoutToUserWorkout } from "../../../adapters";
import { paths } from "../../../routes/paths";

export const UserWorkoutContainer = () => {
    const location = useLocation();
    const { loading, callEndpoint } = useService<GetUserWorkoutResponse>();
    const router = useRouter();

    const [userWorkout, setUserWorkout] = useState<UserWorkout | null>(null);

    const fetchUserWorkout = async (id: string) => {
        const response = await callEndpoint(await workoutService.getUserWorkout(id));
        if (response.data) {
            setUserWorkout(adaptGetUserWorkoutToUserWorkout(response.data));
        }
    }

    const handleGetWorkoutHistoric = async () => {
        router.push(paths.users.workoutHistory, {
            state: {
                userId: location.state?.userId
            }
        })
    }

    useEffect(() => {
        if (location.state?.userId)
            fetchUserWorkout(location.state?.userId);
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
                    {userWorkout.userName} {userWorkout.workoutPlanName ? ` - ${userWorkout.workoutPlanName}` : ""}
                </Typography>
                <Stack direction={"row"} spacing={2}>
                    <SvgIcon>
                        <CalendarMonthIcon sx={{ color: primary.main }} />
                    </SvgIcon>
                    <Typography gutterBottom>
                        {`${userWorkout.userDaysPerWeek.reduce((acc, value) => (value ? acc + 1 : acc), 0)} días por semana`}
                    </Typography>
                </Stack>

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
                    <Button variant="contained" onClick={handleGetWorkoutHistoric}>Ver Historial</Button>
                </Stack>
                <UserWorkoutWeek workouts={userWorkout.workouts} />
            </Stack>
        </Paper >
    )
}