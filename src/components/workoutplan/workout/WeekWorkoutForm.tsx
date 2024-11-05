import { Stack, Grid2, TextField, Button } from "@mui/material";
import { useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";

import { WorkoutPlanFormValues } from "../../../models";
import { primary } from "../../../theme/colors";

export const WeekWorkoutForm = (props: { week: number }) => {

    const { week } = props;

    const { values, touched, errors, handleBlur, handleChange, setFieldError, setFieldValue } = useFormikContext<WorkoutPlanFormValues>();

    const hasFormErrors = () => {
        if (values.day === undefined || values.day < 1) {
            setFieldError("day", "El día es requerido");
            return true;
        }
        if (values.exerciseName === undefined || values.exerciseName.length < 1) {
            setFieldError("exerciseName", "El nombre del ejercicio es requerido");
            return true;
        }
        if (values.series === undefined || values.series < 1) {
            setFieldError("series", "La serie es requerida");
            return true;
        }
        if (values.repetitions === undefined || values.repetitions < 1) {
            setFieldError("repetitions", "Las repeticiones son requeridas");
            return true;
        }
        if (values.weight === undefined || values.weight < 0) {
            setFieldError("weight", "El peso es requerido");
            return true;
        }
        return false;
    }

    const handleAddWorkout = async () => {

        if (hasFormErrors()) return;

        const saved = values.workouts.find(workout => workout.week === week && workout.day === values.day)?.exercise.push({
            id: uuidv4(),
            name: values.exerciseName,
            series: values.series,
            repetitions: values.repetitions,
            weight: values.weight,
            rir: values.rir,
            rpe: values.rpe,
            comments: values.comments
        });

        if (!saved) {
            setFieldValue("workouts", [...values.workouts, {
                id: uuidv4(),
                week: week,
                day: values.day,
                description: values.description,
                exercise: [{
                    name: values.exerciseName,
                    series: values.series,
                    repetitions: values.repetitions,
                    weight: values.weight,
                    rir: values.rir,
                    rpe: values.rpe,
                    comments: values.comments
                }]
            }]);
        }

        // reset fields
        setFieldValue("day", 1);
        setFieldValue("description", "");
        setFieldValue("exerciseName", "");
        setFieldValue("series", 0);
        setFieldValue("repetitions", 0);
        setFieldValue("weight", 0);
        setFieldValue("rir", 0);
        setFieldValue("rpe", 0);
        setFieldValue("comments", "");
    }

    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3} sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 1 }}>
                    <TextField
                        error={!!(touched.day && errors.day)}
                        fullWidth
                        helperText={touched.day && errors.day}
                        label="Día"
                        name="day"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.day}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 11 }}>
                    <TextField
                        error={!!(touched.description && errors.description)}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Descripción"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3 }}>
                    <TextField
                        error={!!(touched.exerciseName && errors.exerciseName)}
                        fullWidth
                        helperText={touched.exerciseName && errors.exerciseName}
                        label="Ejercicio"
                        name="exerciseName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.exerciseName}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 1 }}>
                    <TextField
                        error={!!(touched.series && errors.series)}
                        fullWidth
                        helperText={touched.series && errors.series}
                        label="Series"
                        name="series"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.series}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 1 }}>
                    <TextField
                        error={!!(touched.repetitions && errors.repetitions)}
                        fullWidth
                        helperText={touched.repetitions && errors.repetitions}
                        label="Repes"
                        name="repetitions"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.repetitions}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 1 }}>
                    <TextField
                        error={!!(touched.weight && errors.weight)}
                        fullWidth
                        helperText={touched.weight && errors.weight}
                        label="Peso"
                        name="weight"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.weight}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 1 }}>
                    <TextField
                        error={!!(touched.rir && errors.rir)}
                        fullWidth
                        helperText={touched.rir && errors.rir}
                        label="RiR"
                        name="rir"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.rir}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 1 }}>
                    <TextField
                        error={!!(touched.rpe && errors.rpe)}
                        fullWidth
                        helperText={touched.rpe && errors.rpe}
                        label="RPE"
                        name="rpe"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.rpe}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                        error={!!(touched.comments && errors.comments)}
                        fullWidth
                        helperText={touched.comments && errors.comments}
                        label="Aclaraciones/Comentarios"
                        name="comments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.comments}
                    />
                </Grid2>
            </Grid2>
            <Button variant="contained"
                onClick={handleAddWorkout}
                sx={{ backgroundColor: primary.main, '&:hover': { backgroundColor: primary.darkest } }}>
                Cargar
            </Button>
        </Stack>
    );
}