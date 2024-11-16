
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Accordion, AccordionSummary, Typography, AccordionDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { Workout } from '../../../models';
import { primary } from '../../../theme/colors';
import { UserWorkoutTableRow } from './UserWorkoutTableRow';

interface UserWorkoutWeekProps {
    workouts: Workout[];
}

export const UserWorkoutWeek = (props: UserWorkoutWeekProps) => {

    const { workouts } = props;

    if (!workouts) return null;

    // Group workouts by week
    const groupedWorkouts = workouts.reduce((acc, workout) => {
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
                        <Typography variant="h6">Semana {(index + 1)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails> 
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
                                                <UserWorkoutTableRow key={index} workout={workout} />
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