import { Stack } from "@mui/material"

import { WeekWorkout } from "./workout/WeekWorkout" 

export const WorkoutFormBody = () => {

    return (
        <Stack spacing={2} mt={2}>
            <WeekWorkout />
        </Stack>
    )
}