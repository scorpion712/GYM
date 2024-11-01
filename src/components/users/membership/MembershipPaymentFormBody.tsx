import { Grid2, Stack, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { DatePicker, DateValidationError } from '@mui/x-date-pickers';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers-pro';

import { DaysPerWeekForm } from "../DaysPerWeekForm";
import { UserMembershipPaymentFormValues } from "../../../models";

export const MembershipPaymentFormBody = () => {

    const { touched, errors, values, handleBlur, handleChange, setFieldValue } = useFormikContext<UserMembershipPaymentFormValues>();

    const handleDateChange = (value: unknown, context: PickerChangeHandlerContext<DateValidationError>) => {
        if (context.validationError) return;
        setFieldValue("date", value);
    };

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6 }}>
                <Stack>
                    <Typography gutterBottom variant="body1" sx={{ fontWeight: "bold" }}>
                        Fecha de pago:
                    </Typography>
                    <DatePicker onChange={handleDateChange}
                        value={values.date}
                        maxDate={new Date()}
                        format='dd/MM/yyyy' />
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
                <Stack>
                    <Typography gutterBottom variant="body1" sx={{ fontWeight: "bold" }}>
                        Total a abonar:
                    </Typography>
                    <TextField
                        error={!!(touched.total && errors.total)}
                        fullWidth
                        helperText={touched.total && errors.total}
                        label="Total"
                        name="total"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.total ?? ""}
                    />
                </Stack>
            </Grid2>
            <Grid2 sx={{ml: 5}}>
                <DaysPerWeekForm />
            </Grid2>
        </Grid2>
    );
}