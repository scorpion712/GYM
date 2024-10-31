import { Grid2, Paper, Typography } from "@mui/material"

import { UserForm } from "../UserForm"

export const CreateUserContainer = () => {
    return (
        <Paper elevation={0} sx={{ p: 2 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Typography variant="h5" gutterBottom>
                        Registrar Cliente
                    </Typography>
                    <UserForm />
                </Grid2>
            </Grid2>
        </Paper>
    )
}