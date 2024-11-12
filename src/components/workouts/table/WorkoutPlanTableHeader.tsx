import { TableHead, TableRow } from "@mui/material"

import { CustomTableCell } from "../../CustomTableCell"

export const WorkoutsTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <CustomTableCell>Nombre</CustomTableCell>
                <CustomTableCell>Objetivo</CustomTableCell>
                <CustomTableCell>Duración</CustomTableCell>
                <CustomTableCell>Inicio</CustomTableCell>
                <CustomTableCell>Fin</CustomTableCell>
                <CustomTableCell>Asignados</CustomTableCell>
                <CustomTableCell>Acciones</CustomTableCell>
            </TableRow>
        </TableHead>
    )
}