import { Grid2, Paper, Typography } from "@mui/material"

import { UserForm } from "../UserForm"

export const EditUserContainer = () => {
    return (
        <Paper elevation={0} sx={{ p: 2 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Typography variant="h5" gutterBottom>
                        Editar Cliente
                    </Typography>
                    <UserForm />
                </Grid2>
            </Grid2>
        </Paper>
    )
}