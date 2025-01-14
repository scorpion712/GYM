import { TableBody, TableCell, TableRow } from "@mui/material"
import { format } from "date-fns"
import { es } from "date-fns/locale" 
import numeral from "numeral"

import { Membership } from "../../../models" 

const MembershipsTableRow = ({ membership }: { membership: Membership }) => { 

    return (
        <TableRow>
            <TableCell sx={{fontSize: '14px', fontWeight: 'bold'}}>{membership.userName}</TableCell>
            <TableCell align="center">{membership.date ? format(new Date(membership.date), "dd MMMM yyyy", { locale: es }) : ""}</TableCell>
            <TableCell align="center">{membership.daysPerWeek}</TableCell> 
            <TableCell align="right">${numeral(membership.total).format(`0,0.00`)}</TableCell> 
        </TableRow>
    )
}

export const MembershipsTableBody = ({ memberships }: { memberships: Membership[] }) => {
    return (
        <TableBody>
            {memberships.map((membership) => (
                <MembershipsTableRow key={membership.id} membership={membership} />
            ))}
        </TableBody>
    )
}