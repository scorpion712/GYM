import { TableRow, TableCell, Tooltip, IconButton, SvgIcon } from "@mui/material"
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DetailsIcon from '@mui/icons-material/Details';

import { useRouter } from "../../../../../hooks";
import { paths } from "../../../../../routes/paths";
import { WorkoutHistory } from "../../../../../models";

export const HistoricWorkoutsTableRow = ({ workout }: { workout: WorkoutHistory }) => {

    const router = useRouter();

    const handleGoToDetail = (id: string) => {
        router.push(paths.users.workoutHistoryDetail, {
            state: {
                workoutId: id,
                username: workout.userName
            }
        });
    }

    return (
        <TableRow>
            <TableCell>{workout.name}</TableCell>
            <TableCell>{workout.objective}</TableCell>
            <TableCell>{workout.duration}</TableCell>
            <TableCell>{format(workout.initDate, "dd MMMM yyyy", { locale: es })}</TableCell>
            <TableCell>{workout.endDate ? format(workout.endDate, "dd MMMM yyyy", { locale: es }) : "-"}</TableCell>
            <TableCell align="right">
                <Tooltip title="Ver Detalle">
                    <IconButton onClick={() => handleGoToDetail(workout.id)}>
                        <SvgIcon>
                            <DetailsIcon color='warning' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}