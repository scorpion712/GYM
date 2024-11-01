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
import { usePopUp, useRouter } from "../../../hooks";
import { paths } from "../../../routes/paths";
import { UserMembershipPayment } from "../membership";

export const UsersTableRow = ({ user }: { user: UserCustomer }) => {

    const router = useRouter();
    const { showPopUp } = usePopUp();

    const handleEditCustomer = (id: string) => {
        router.push(paths.users.edit, { 
            state: {
                userId: id
            }
        });
    }

    const handleGoToDetail = (id: string) => {
        console.log("Ver Detalle", id)
    }

    const registerMembershipPayment = (id: string, name: string, daysPerWeek: boolean[]) => {
        showPopUp(`Membresía de cliente ${name}`, <UserMembershipPayment id={id} daysPerWeek={daysPerWeek} />);
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
                    <IconButton onClick={() => registerMembershipPayment(user.id, `${user.firstName} ${user.lastName}`, user.daysPerWeek)}>
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