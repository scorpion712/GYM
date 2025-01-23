import { TableHead, TableRow } from "@mui/material"

import { CustomTableCell } from "../../CustomTableCell"

export const MembershipsTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <CustomTableCell>Nombre</CustomTableCell>
                <CustomTableCell align="center">Último pago</CustomTableCell>
                <CustomTableCell align="center">Días por semana</CustomTableCell>
                <CustomTableCell align="right">Total</CustomTableCell> 
            </TableRow>
        </TableHead>
    )
}