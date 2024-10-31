import { Stack, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, useTheme, useMediaQuery } from "@mui/material";
import { UserRegistrationFormValues } from "../../models";
import { useFormikContext } from "formik";

export const DaysPerWeekForm = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const { touched, errors, values, setFieldValue } = useFormikContext<UserRegistrationFormValues>();

    const handleDayChoose = (day: number, checked: boolean) => {
        const days = values.daysPerWeek;
        days[day] = checked;
        setFieldValue("daysPerWeek", days);
    }

    return (
        <Stack display="flex" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h6" gutterBottom align="center">Días por semana:</Typography>
            <FormControl component="fieldset">
                <FormGroup row >
                    <FormControlLabel
                        value="bottom"
                        control={<Checkbox />}
                        label={isSmallScreen ? "L" : "Lunes"}
                        labelPlacement="top"
                        checked={values.daysPerWeek[0]}
                        onClick={() => handleDayChoose(0, !values.daysPerWeek[0])}
                    />
                    <FormControlLabel
                        value="bottom"
                        control={<Checkbox />}
                        label={isSmallScreen ? "M" : "Martes"}
                        labelPlacement="top"
                        checked={values.daysPerWeek[1]}
                        onClick={() => handleDayChoose(1, !values.daysPerWeek[1])}
                    />
                    <FormControlLabel
                        value="bottom"
                        control={<Checkbox />}
                        label={isSmallScreen ? "M" : "Miércoles"}
                        labelPlacement="top"
                        checked={values.daysPerWeek[2]}
                        onClick={() => handleDayChoose(2, !values.daysPerWeek[2])}
                    />
                    <FormControlLabel
                        value="bottom"
                        control={<Checkbox />}
                        label={isSmallScreen ? "J" : "Jueves"}
                        labelPlacement="top"
                        checked={values.daysPerWeek[3]}
                        onClick={() => handleDayChoose(3, !values.daysPerWeek[3])}
                    />
                    <FormControlLabel
                        value="bottom"
                        control={<Checkbox />}
                        label={isSmallScreen ? "V" : "Viernes"}
                        labelPlacement="top"
                        checked={values.daysPerWeek[4]}
                        onClick={() => handleDayChoose(4, !values.daysPerWeek[4])}
                    />
                </FormGroup>
            </FormControl>
            {
                touched.daysPerWeek && errors.daysPerWeek &&
                    <Typography variant="caption" color="error">{errors.daysPerWeek}</Typography>
            }
        </Stack>
    );
}