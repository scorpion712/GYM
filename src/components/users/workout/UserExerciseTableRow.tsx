import { TableCell, TableRow } from "@mui/material";

import { Exercise } from "../../../models";

export const UserExerciseTableRow =  (props: { exercise: Exercise }) => {
    const { exercise  } = props;

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
        </TableRow>
    )
}