import { Accordion, AccordionSummary, Typography, AccordionDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useFormikContext } from "formik";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { Workout, WorkoutPlanFormValues } from "../../../models";
import { primary } from "../../../theme/colors";
import { WeekWorkoutForm } from "./WeekWorkoutForm";
import { WorkoutTableRow } from "./WorkoutTableRow";

export const WeekWorkout = () => {

    const { values } = useFormikContext<WorkoutPlanFormValues>();

    if (!values.workouts) return null;

    // Group workouts by week
    const groupedWorkouts = values.workouts.reduce((acc, workout) => {
        if (!acc[workout.week]) {
            acc[workout.week] = [];
        }
        acc[workout.week].push(workout);
        return acc;
    }, {} as Record<number, Workout[]>);

    return (
        Object.entries(groupedWorkouts).map(([week,], index: number) => {
            return (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                    >
                        <Typography variant="h6">Semana {(week ? week : index + 1)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <WeekWorkoutForm week={week ? parseInt(week) : (index + 1)} /> 
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >Día</TableCell>
                                        <TableCell style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >Descripción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        groupedWorkouts[week as unknown as number].map((workout: Workout, index: number) => {
                                            return (
                                                <WorkoutTableRow key={index} workout={workout} />
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            )
        })
    );
}