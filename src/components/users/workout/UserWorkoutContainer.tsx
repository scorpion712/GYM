import { Box, LinearProgress, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TimerIcon from '@mui/icons-material/Timer';

import { useService } from "../../../hooks";
import { workoutService } from "../../../services";
import { useLocation } from "react-router-dom";
import { GetUserWorkoutResponse, UserWorkout, Workout } from "../../../models";
import { UserWorkoutWeek } from "./UserWorkoutWeek";
import { primary } from "../../../theme/colors";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { adaptGetUserWorkoutToUserWorkout } from "../../../adapters";

const mockedUserWorkout = {
    id: "1",
    userId: "1",
    userName: "Ronnie Coleman",
    userDaysPerWeek: [true, true, true, true, true],
    workoutPlanName: "Hipertrofia",
    objective: "Aumento de Hipertrofia",
    duration: 4,
    initDate: new Date(), 
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
} as UserWorkout

    
export const UserWorkoutContainer = () => {
    const location = useLocation();
    const { loading, callEndpoint } = useService<GetUserWorkoutResponse>();

    const [userWorkout, setUserWorkout] = useState<UserWorkout>(mockedUserWorkout);

    const fetchUserWorkout = async (id: string) => {
        const response = await callEndpoint(await workoutService.getUserWorkout(id));
        if (response.data) { 
            setUserWorkout(adaptGetUserWorkoutToUserWorkout(response.data));
        }
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
                <Stack direction={{xs: "column", md: "row"}} spacing={{xs: 1, md: 4}} >
                    <Stack direction={"row"} spacing={2}>
                        <SvgIcon>
                            <EventAvailableIcon />
                        </SvgIcon>
                        <Typography gutterBottom>
                            Inicio: <span style={{ fontWeight: "bold" }}>{format(userWorkout.initDate, "dd MMMM yyyy", { locale: es })}</span>
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
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
    )
}