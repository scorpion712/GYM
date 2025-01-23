import { TableBody } from "@mui/material"

import { HistoricWorkoutsTableRow } from "./HistoricWorkoutsTableRow"
import { WorkoutHistory } from "../../../../../models"

export const HistoricWorkoutsTableBody = ({ workouts }: { workouts: WorkoutHistory[] }) => {
    return (
        <TableBody>
            {workouts.map((workout) => (
                <HistoricWorkoutsTableRow key={workout.id} workout={workout} />
            ))}
        </TableBody>
    )
}