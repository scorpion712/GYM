import { TableHead, TableRow } from "@mui/material"

import { CustomTableCell } from "../../../../CustomTableCell"


export const HistoricWorkoutstTableHeader = () => {
    return (
        <TableHead>
            <TableRow >
                <CustomTableCell>Nombre</CustomTableCell>
                <CustomTableCell>Objetivo</CustomTableCell>
                <CustomTableCell>Duración</CustomTableCell>
                <CustomTableCell>Inicio</CustomTableCell>
                <CustomTableCell>Fin</CustomTableCell>
                <CustomTableCell align="right">Acciones</CustomTableCell>
            </TableRow>
        </TableHead>
    )
}