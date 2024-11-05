import { Paper } from "@mui/material";

import { WorkoutPlanForm } from "./WorkoutPlanForm";

export const CreateWorkoutPlanContainer = () => {

    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <WorkoutPlanForm />
        </Paper >
    )
}