import { IconButton, SvgIcon, TableCell, TableRow, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { Exercise, WorkoutPlanFormValues } from "../../../models";
import { useFormikContext } from "formik";

export const ExerciseTableRow = (props: { exercise: Exercise }) => {
    const { exercise  } = props;

    const { setFieldValue, values } = useFormikContext<WorkoutPlanFormValues>();

    const handleRemoveExercise = (id: string) => { 
        setFieldValue("workouts", values.workouts.map(workout => {
            return {
                ...workout,
                exercise: workout.exercise.filter(exercise => exercise.id !== id)
            }
        }));
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {exercise.name}
            </TableCell>
            <TableCell>
                {exercise.series}
            </TableCell>
            <TableCell align="right">
                {exercise.repetitions}
            </TableCell>
            <TableCell align="right">
                {exercise.weight}kg
            </TableCell>
            <TableCell align="right">
                {exercise.rir}
            </TableCell>
            <TableCell align="right">
                {exercise.rpe}
            </TableCell>
            <TableCell>
                {exercise.comments}
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Quitar ejercicio">
                    <IconButton onClick={() => handleRemoveExercise(exercise.id)}>
                        <SvgIcon>
                            <DeleteIcon color='primary' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}