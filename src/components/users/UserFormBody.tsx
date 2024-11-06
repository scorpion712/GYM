import { Grid2, Stack, TextField } from "@mui/material";
import { useFormikContext } from "formik"

import { UserRegistrationFormValues } from "../../models";
import { DaysPerWeekForm } from "./DaysPerWeekForm";

export const UserFormBody = () => {

    const { touched, errors, values, handleBlur, handleChange } = useFormikContext<UserRegistrationFormValues>();

    return (
        <Stack spacing={3} sx={{ mt: 4 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        error={!!(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="Nombre"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        error={!!(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Apellido"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                    />
                </Grid2> 
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        error={!!(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Correo electrónico"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        error={!!(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label="Teléfono"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        error={!!(touched.dni && errors.dni)}
                        fullWidth
                        helperText={touched.dni && errors.dni}
                        label="DNI"
                        name="dni"
                        onBlur={handleBlur}
                        onChange={handleChange} 
                        value={values.dni}
                    /> 
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                        error={!!(touched.considerations && errors.considerations)}
                        fullWidth
                        helperText={touched.considerations && errors.considerations}
                        label="Consideraciones"
                        name="considerations"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        multiline 
                        maxRows={3}
                        value={values.considerations}
                    /> 
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6  }}>
                    <DaysPerWeekForm />
                </Grid2>
            </Grid2>
        </Stack>
    );
}