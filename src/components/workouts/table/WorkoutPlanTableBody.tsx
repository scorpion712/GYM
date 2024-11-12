import { IconButton, SvgIcon, TableBody, TableCell, TableRow, Tooltip } from "@mui/material"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import EditIcon from '@mui/icons-material/Edit';

import { WorkoutPlan } from "../../../models"
import { useRouter } from "../../../hooks";
import { paths } from "../../../routes/paths";

const WorkoutsTableRow = ({ workoutPlan }: { workoutPlan: WorkoutPlan }) => {

    const router = useRouter();

    const handleEditPlan = (id: string) => {
        router.push(paths.workout.edit, { 
            state: {
                workoutPlanId: id
            }
        });
    }

    return (
        <TableRow>
            <TableCell>{workoutPlan.name}</TableCell>
            <TableCell>{workoutPlan.objective}</TableCell>
            <TableCell>{workoutPlan.duration} semanas</TableCell>
            <TableCell>{format(workoutPlan.initDate.getTime(), "dd/MM/yyyy", { locale: es })}</TableCell>
            <TableCell>{workoutPlan.endDate ? format(workoutPlan.endDate.getTime(), "dd/MM/yyyy", { locale: es }) : "-"}</TableCell>
            <TableCell>{workoutPlan.assignedUsers.length}</TableCell>
            <TableCell>
                <Tooltip title="Editar Plan">
                    <IconButton onClick={() => handleEditPlan(workoutPlan.id)}>
                        <SvgIcon>
                            <EditIcon color='primary' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export const WorkoutsTableBody = ({ workoutPlans }: { workoutPlans: WorkoutPlan[] }) => {
    return (
        <TableBody>
            {workoutPlans.map((workoutPlan) => (
                <WorkoutsTableRow key={workoutPlan.id} workoutPlan={workoutPlan} />
            ))}
        </TableBody>
    )
}