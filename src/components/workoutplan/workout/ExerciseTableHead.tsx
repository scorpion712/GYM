import { TableHead, TableRow, TableCell } from "@mui/material";

import { primary } from "../../../theme/colors";

export const ExerciseTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >Ejercicio</TableCell>
                <TableCell align="right" width={10} style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >Series</TableCell>
                <TableCell align="right" width={15} style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >Repes</TableCell>
                <TableCell align="right" width={20} style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >Peso</TableCell>
                <TableCell align="right" width={15} style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >RiR</TableCell>
                <TableCell align="right" width={15} style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >RPE</TableCell>
                <TableCell width={150} style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} >Aclaraciones</TableCell>
                <TableCell style={{ backgroundColor: primary.main, color: primary.contrastText, fontWeight: 550 }} ></TableCell>
            </TableRow>
        </TableHead>
    );
}