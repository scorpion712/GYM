import { TableRow, TableCell, Tooltip, IconButton, SvgIcon, Chip } from "@mui/material"
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import PaidIcon from '@mui/icons-material/Paid';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteIcon from '@mui/icons-material/Delete';

import { DeleteUserResponse, UserCustomer } from "../../../models"
import { daysPerWeekToString, isActiveMembership} from "../../../utils"
import { usePopUp, useRouter, useService } from "../../../hooks";
import { paths } from "../../../routes/paths";
import { UserMembershipPayment } from "../membership";
import { UserDetail } from "../UserDetail";
import { userService } from "../../../services";
import { error, primary, success } from "../../../theme/colors";

export const UsersTableRow = ({ user }: { user: UserCustomer }) => {

    const router = useRouter();
    const { showPopUp } = usePopUp();
    const { callEndpoint } = useService<DeleteUserResponse>();

    const handleEditCustomer = (id: string) => {
        router.push(paths.users.edit, {
            state: {
                userId: id
            }
        });
    }

    const handleGoToDetail = (id: string, name: string) => {
        showPopUp(`Datos de ${name}`, <UserDetail id={id} />);
    }

    const registerMembershipPayment = (id: string, name: string, daysPerWeek: boolean[]) => {
        showPopUp(`Membresía de ${name}`, <UserMembershipPayment id={id} daysPerWeek={daysPerWeek} />);
    }

    const handleViewCustomerWorkoutPlan = (id: string) => {
        router.push(paths.users.workout, {
            state: {
                userId: id
            }
        });
    }

    const handleRemoveCustomer = async (id: string) => {
        const response = await callEndpoint(await userService.deleteUser(id));
        if (response.data.id) {
            router.refresh();
        }
    }
    
    return (
        <TableRow>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName ?? ""}</TableCell>
            <TableCell>{user.phone ?? ""}</TableCell>
            <TableCell>{user.email ?? ""}</TableCell>
            <TableCell align="center">{user.age ?? ""}</TableCell>
            <TableCell align="right">{daysPerWeekToString(user.daysPerWeek)}</TableCell>
            <TableCell align="right">
                <Chip label={user.lastPaidDate ? format(user.lastPaidDate, "dd MMMM yyyy", { locale: es }) : ""}
                    sx={{
                        backgroundColor: isActiveMembership(user.lastPaidDate ? new Date(user.lastPaidDate) : null) ?  success.main : error.main,
                        color: primary.contrastText
                    }} />
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Editar cliente">
                    <IconButton onClick={() => handleEditCustomer(user.id)}>
                        <SvgIcon>
                            <EditIcon color='primary' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Ver Rutina">
                    <IconButton onClick={() => handleViewCustomerWorkoutPlan(user.id)}>
                        <SvgIcon>
                            <FitnessCenterIcon color='info' />
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
                <Tooltip title="Ver Detalle">
                    <IconButton onClick={() => handleGoToDetail(user.id, `${user.firstName} ${user.lastName}`)}>
                        <SvgIcon>
                            <DetailsIcon color='warning' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Dar de baja">
                    <IconButton onClick={() => handleRemoveCustomer(user.id)}>
                        <SvgIcon>
                            <DeleteIcon color='error' />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}