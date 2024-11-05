import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";

import { SaveWorkoutPlanResponse, Workout, WorkoutPlanFormValues } from "../../models";
import { WorkoutPlanFormBody } from "./WorkoutPlanFormBody";
import { WorkoutFormContainer } from "./workout/WorkoutFormContainer";
import { primary } from "../../theme/colors";
import { CustomerWorkoutAssignment } from "./CustomerWorkoutAssignment";
import { workoutService } from "../../services";
import { adaptWorkoutPlanToSaveWorkoutPlanRequest } from "../../adapters";
import { useRouter, useService } from "../../hooks";
import { SnackBarUtilities } from "../../utils";
import { paths } from "../../routes/paths";

const formInitialValues = {
    name: "",
    objective: "",
    duration: 0,
    initDate: new Date(),
    workouts: [] as Workout[],
    day: 1,
    description: "",
    exerciseName: "",
    series: 0,
    repetitions: 0,
    weight: 0,
    rir: 0,
    rpe: 0,
    comments: "",
    customersId: [] as string[]
} as WorkoutPlanFormValues;

const formValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),

    objective: Yup.string()
        .optional()
        .min(2, 'El objetivo debe tener al menos 2 caracteres'),

    duration: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, 'La duración debe contener solo números'),

    day: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, 'El día debe contener solo números')
        .min(1, 'El día es requerido'),

    exerciseName: Yup.string()
        .optional()
        .min(1, "El ejercicio es requerido"),

    series: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, 'La serie debe contener solo números')
        .min(1, 'La serie debe ser al menos 1'),

    repetitions: Yup.string()
        .optional()
        .min(1, 'Las repeticiones deben ser'),

    weight: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, 'El peso debe contener solo números'),

    rir: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, 'El rir debe contener solo números'),

    rpe: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, 'El rpe debe contener solo números'),
});

export const WorkoutPlanForm = () => {

    const { loading, callEndpoint } = useService<SaveWorkoutPlanResponse>();
    const router = useRouter();

    const handleFormSubmit = async (values: WorkoutPlanFormValues) => {
        const response = await callEndpoint(await workoutService.saveWorkoutPlan(adaptWorkoutPlanToSaveWorkoutPlanRequest(values)));
        if (response.data.id) {
            SnackBarUtilities.success("Plan de entrenamiento guardado correctamente");
            router.push(paths.index);
        }
    }

    if (loading)
        return (
            <Box>
                <LinearProgress sx={{ mt: 5 }} />
            </Box>
        );

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={formValidationSchema}
            onSubmit={handleFormSubmit}>
            <Form>
                <Stack display="flex" alignItems="end" justifyContent="flex-end" spacing={2} visibility={{ xs: 'hidden', md: 'visible' }}>
                    <Button variant="contained" sx={{ backgroundColor: primary.main, '&:hover': { backgroundColor: primary.darkest } }} type="submit">
                        Guardar
                    </Button>
                </Stack>

                <CustomerWorkoutAssignment />

                <Typography variant="h5" gutterBottom>
                    Plan de Entrenamiento
                </Typography>
                <WorkoutPlanFormBody />
                <WorkoutFormContainer />
                <Stack display="flex"
                    mt={2}
                    alignItems={{ xs: 'center', md: 'end' }}
                    justifyContent={{ xs: 'center', md: "flex-end" }}
                    spacing={2} visibility={{ md: 'hidden', xs: 'visible' }}>
                    <Button variant="contained" sx={{ backgroundColor: primary.main }} type="submit">
                        Guardar
                    </Button>
                </Stack>
            </Form>
        </Formik >
    );
}