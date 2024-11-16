import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableBody } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fragment, useState } from "react";

import { Workout } from "../../../models";
import { ExerciseTableHead } from "./ExerciseTableHead";
import { ExerciseTableRow } from "./ExerciseTableRow";

export const WorkoutTableRow = (props: { workout: Workout }) => {

    const { workout } = props;
    const [open, setOpen] = useState(false);

    if (!workout || workout.exercise.length < 1) return null;

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
                <TableCell width={200} sx={{ fontWeight: 550 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    Día {workout.day}
                </TableCell>
                <TableCell sx={{ fontWeight: 550 }}>
                    {workout.description}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small">
                                <ExerciseTableHead />
                                <TableBody>
                                    {
                                        workout.exercise.map((exercise, index) => {
                                            return (
                                                <ExerciseTableRow key={index} exercise={exercise} />
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}