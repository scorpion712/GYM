import { TableBody } from "@mui/material"

import { UserCustomer } from "../../../models"
import { UsersTableRow } from "./UsersTableRow"

export const UsersTableBody = ({ users }: { users: UserCustomer[] }) => {
    return (
        <TableBody>
            {users.map((user) => (
                <UsersTableRow key={user.id} user={user} />
            ))}
        </TableBody>
    )
}