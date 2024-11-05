import { Button, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";

import { WorkoutFormBody } from "../WorkoutFormBody";
import { Workout, WorkoutPlanFormValues } from "../../../models";
import { SnackBarUtilities } from "../../../utils";
import { primary } from "../../../theme/colors";

export const WorkoutFormContainer = () => {

    const { values, setFieldValue } = useFormikContext<WorkoutPlanFormValues>();

    const handleAddWorkout = () => {
        const workoutsLength = Object.entries(values.workouts.reduce((acc, workout) => {
            if (!acc[workout.week]) {
                acc[workout.week] = [];
            }
            acc[workout.week].push(workout);
            return acc;
        }, {} as Record<number, Workout[]>)).length;

        if (workoutsLength >= (values.duration ?? -1)) {
            SnackBarUtilities.error("Modifique la duración para agregar más semanas");
            return;
        }
        setFieldValue("workouts", [...values.workouts, { week: values.workouts.length + 1, exercise: [] }]);
    }

    return (
        <Stack mt={5}>
            <Stack direction={'row'} spacing={2} sx={{ display: 'flex', justifyContent: "space-between" }}>
                <Typography variant="h5" gutterBottom mt={5}>
                    Rutina
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: primary.main, '&:hover': { backgroundColor: primary.darkest }}} onClick={handleAddWorkout}>
                    Agregar Semana
                </Button>
            </Stack>
            <WorkoutFormBody />
        </Stack>
    );
}