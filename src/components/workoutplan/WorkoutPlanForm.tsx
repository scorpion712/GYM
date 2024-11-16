import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";

import { EditWorkoutPlanResponse, GetWorkoutPlanResponse, SaveWorkoutPlanResponse, Workout, WorkoutPlanDetail, WorkoutPlanFormValues } from "../../models";
import { WorkoutPlanFormBody } from "./WorkoutPlanFormBody";
import { WorkoutFormContainer } from "./workout/WorkoutFormContainer";
import { primary } from "../../theme/colors";
import { CustomerWorkoutAssignment } from "./CustomerWorkoutAssignment";
import { workoutService } from "../../services";
import { adaptGetWorkoutPlanToWorkoutPlan, adaptWorkoutPlanToEditWorkoutPlanRequest, adaptWorkoutPlanToSaveWorkoutPlanRequest } from "../../adapters";
import { useAsync, useRouter, useService } from "../../hooks";
import { SnackBarUtilities } from "../../utils"; 
import { useLocation } from "react-router-dom";
import { useState } from "react";

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
    const { loading: savingWorkoutPlan, callEndpoint: callEditEndpoint } = useService<EditWorkoutPlanResponse>();
    const router = useRouter();

    const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanDetail | null>(null);
    const location = useLocation();
    const { loading: fetchingWorkoutPlan, callEndpoint: callEndpointGetWorkoutPlan } = useService<GetWorkoutPlanResponse>();

    const fetchWorkoutPlan = async () => location.state?.workoutPlanId && await callEndpointGetWorkoutPlan(await workoutService.getWorkoutPlan(location.state.workoutPlanId));

    const handleFetchUsersResponse = (data: GetWorkoutPlanResponse) => { 
        setWorkoutPlan(adaptGetWorkoutPlanToWorkoutPlan(data));
    }

    useAsync(fetchWorkoutPlan, handleFetchUsersResponse);

    const handleFormSubmit = async (values: WorkoutPlanFormValues) => { 
        const response = location.state?.workoutPlanId
        ? await callEditEndpoint(await workoutService.editWorkoutPlan(adaptWorkoutPlanToEditWorkoutPlanRequest(values)))
        : await callEndpoint(await workoutService.saveWorkoutPlan(adaptWorkoutPlanToSaveWorkoutPlanRequest(values)));
        if (response.data.id) {
            SnackBarUtilities.success("Plan de entrenamiento guardado correctamente");
            router.back();
        }
    }

    if (loading || fetchingWorkoutPlan || savingWorkoutPlan)
        return (
            <Box>
                <LinearProgress sx={{ mt: 5 }} />
            </Box>
        ); 

    return (
        <Formik
            initialValues={{
                ...formInitialValues,
                id: workoutPlan ? workoutPlan.id : "",
                name: workoutPlan ? workoutPlan.name : "",
                objective: workoutPlan ? workoutPlan.objective : "",
                duration: workoutPlan ? workoutPlan.duration : 0,
                workouts: workoutPlan ? workoutPlan.workouts : [],
                initDate: workoutPlan ? new Date(workoutPlan.initDate) : new Date(),
                endDate: workoutPlan ? workoutPlan.endDate ? new Date(workoutPlan.endDate) : undefined : undefined,
                customersId: workoutPlan ? workoutPlan.assignedUsers.map(user => user.id) : []
            }}
            validationSchema={formValidationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize>
            <Form>
                <Stack display="flex" alignItems="end" justifyContent="flex-end" spacing={2} visibility={{ xs: 'hidden', md: 'visible' }}>
                    <Button variant="contained" sx={{ backgroundColor: primary.main, '&:hover': { backgroundColor: primary.darkest } }} type="submit">
                        Guardar
                    </Button>
                </Stack>

                <CustomerWorkoutAssignment selectedUsers={workoutPlan?.assignedUsers || []} />

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