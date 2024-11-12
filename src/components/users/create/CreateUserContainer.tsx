import { Grid2, Paper, Typography } from "@mui/material"

import { UserForm } from "../UserForm" 
import { useLocation } from "react-router-dom";

export const CreateUserContainer = () => {
    const location = useLocation();

    return (
        <Paper elevation={0} sx={{ p: 2 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Typography variant="h5" gutterBottom>
                        {location.state?.userId ? "Editar Cliente" : "Registrar Cliente"}
                    </Typography>
                    <UserForm />
                </Grid2>
            </Grid2>
        </Paper>
    )
}