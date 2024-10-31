import { TableCell, TableHead, TableRow } from "@mui/material"
import { primary } from "../../../theme/colors"

const CustomTableCell = ({ children, align }: { children: React.ReactNode, align?: "left" | "right" | "center" | "inherit" }) => {
    return (
        <TableCell align={align ? align : "inherit"} style={{ color: primary.contrastText, fontWeight: "bold", backgroundColor: primary.main }}>{children}</TableCell>
    )
};

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