import { TableHead, TableRow } from "@mui/material"

import { CustomTableCell } from "../../CustomTableCell"


export const UsersTableHeader = () => {
    return (
        <TableHead >
            <TableRow >
                <CustomTableCell>Nombre</CustomTableCell>
                <CustomTableCell>Apellido</CustomTableCell>
                <CustomTableCell>Teléfono</CustomTableCell>
                <CustomTableCell>Email</CustomTableCell>
                <CustomTableCell>Edad</CustomTableCell>
                <CustomTableCell align="right">Días por semana</CustomTableCell>
                <CustomTableCell align="right">Última fecha de pago</CustomTableCell>
                <CustomTableCell align="center">Acciones</CustomTableCell>
            </TableRow>
        </TableHead>
    )
}