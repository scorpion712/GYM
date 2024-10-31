import { TableRow, TableCell, Tooltip, IconButton, SvgIcon } from "@mui/material"
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import PaidIcon from '@mui/icons-material/Paid';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteIcon from '@mui/icons-material/Delete';

import { UserCustomer } from "../../../models"
import { daysPerWeekToString } from "../../../utils"

export const UsersTableRow = ({ user }: { user: UserCustomer }) => {

    const handleEditCustomer = (id: string) => {
        console.log("Editar cliente", id)
    }

    const handleGoToDetail = (id: string) => {
        console.log("Ver Detalle", id)
    }

    const registerMembershipPayment = (id: string) => {
        console.log("Registrar Pago", id)
    }

    return (
        <TableRow>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName ?? ""}</TableCell>
            <TableCell>{user.phone ?? ""}</TableCell>
            <TableCell>{user.email ?? ""}</TableCell>
            <TableCell align="center">{user.age ?? ""}</TableCell>
            <TableCell align="right">{daysPerWeekToString(user.daysPerWeek)}</TableCell>
            <TableCell align="right">{user.lastPaidDate ? format(user.lastPaidDate, "dd MMMM yyyy", { locale: es }) : ""}</TableCell>
            <TableCell align="right"> 
                <Tooltip title="Editar cliente">
                    <IconButton onClick={() => handleEditCustomer(user.id)}>
                        <SvgIcon>
                            <EditIcon color='primary' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Ver Detalle">
                    <IconButton onClick={() => handleGoToDetail(user.id)}>
                        <SvgIcon>
                            <DetailsIcon color='warning' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Registrar Pago">
                    <IconButton onClick={() => registerMembershipPayment(user.id)}>
                        <SvgIcon>
                            <PaidIcon color='success' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Ver Rutina">
                    <IconButton onClick={() => handleEditCustomer(user.id)}>
                        <SvgIcon>
                            <FitnessCenterIcon color='info' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Dar de baja">
                    <IconButton onClick={() => handleEditCustomer(user.id)}>
                        <SvgIcon>
                            <DeleteIcon color='error' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}