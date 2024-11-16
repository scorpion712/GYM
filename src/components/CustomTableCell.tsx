import { TableCell } from "@mui/material";

import { primary } from "../theme/colors";

export const CustomTableCell = ({ children, align }: { children: React.ReactNode, align?: "left" | "right" | "center" | "inherit" }) => {
    return (
        <TableCell align={align ? align : "inherit"} style={{ color: primary.contrastText, fontWeight: "bold", backgroundColor: primary.main }}>{children}</TableCell>
    )
};