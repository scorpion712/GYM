import { Grid2, Stack, TextField, Typography } from "@mui/material"
import { useFormikContext } from "formik";

import { WorkoutPlanFormValues } from "../../models";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers-pro";

export const WorkoutPlanFormBody = () => {

    const { touched, errors, values, handleBlur, handleChange, setFieldValue } = useFormikContext<WorkoutPlanFormValues>();

    const handleDateChange = (value: unknown, context: PickerChangeHandlerContext<DateValidationError>) => {
        if (context.validationError) return;
        setFieldValue("date", value);
    }; 

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    error={!!(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Nombre"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    error={!!(touched.duration && errors.duration)}
                    fullWidth
                    helperText={touched.duration && errors.duration}
                    label="Duración (semanas)"
                    name="duration"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.duration}
                />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                <TextField
                    error={!!(touched.objective && errors.objective)}
                    fullWidth
                    helperText={touched.objective && errors.objective}
                    label="Objetivo"
                    name="objective"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.objective}
                    maxRows={3}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Stack>
                    <Typography gutterBottom variant="body1" sx={{ fontWeight: "bold" }}>
                        Fecha de inicio:
                    </Typography>
                    <DatePicker onChange={handleDateChange}
                        value={values.initDate}
                        maxDate={new Date()}
                        format='dd/MM/yyyy' />
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Stack>
                    <Typography gutterBottom variant="body1" sx={{ fontWeight: "bold" }}>
                        Fecha de fin:
                    </Typography>
                    <DatePicker onChange={handleDateChange}
                        value={values.endDate}
                        maxDate={new Date()}
                        format='dd/MM/yyyy' />
                </Stack>
            </Grid2>
        </Grid2>
    );
}