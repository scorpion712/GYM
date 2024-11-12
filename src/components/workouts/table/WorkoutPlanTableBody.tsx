import { IconButton, SvgIcon, TableBody, TableCell, TableRow, Tooltip } from "@mui/material"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { WorkoutPlan } from "../../../models"

const WorkoutsTableRow = ({ workoutPlan }: { workoutPlan: WorkoutPlan }) => {

    const handleEditPlan = (id: string) => {
        console.log("Editar Plan", id)
    }

    const handleAssignToCustomer = (id: string) => {
        console.log("Asignar Plan a Cliente", id)
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
                <Tooltip title="Asignar Plan">
                    <IconButton onClick={() => handleAssignToCustomer(workoutPlan.id)}>
                        <SvgIcon>
                            <AssignmentIcon color='info' />
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