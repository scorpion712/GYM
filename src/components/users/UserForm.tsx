import { Box, Button, LinearProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { useRouter, useService } from "../../hooks";
import { UserRegistrationFormValues, CreateUserRequest, CreateUserResponse } from "../../models";
import { userService } from "../../services";
import { paths } from "../../routes/paths";
import { UserFormBody } from "./UserFormBody";

const formInitialValues = {
    email: "",
    firstName: "",
    lastName: "",
} as UserRegistrationFormValues;

const formValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('El nombre es requerido')
        .min(2, 'El nombre debe tener al menos 2 caracteres'),

    lastName: Yup.string()
        .optional()
        .min(2, 'El apellido debe tener al menos 2 caracteres'),

    username: Yup.string()
        .required('El apodo es requerido')
        .min(3, 'El apodo debe tener al menos 3 caracteres'),

    age: Yup.number()
        .optional()
        .positive('La edad debe ser un numero positivo')
        .integer('La edad debe ser un numero positivo'),

    phone: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, 'El número de teléfono debe contener solo dígitos')
        .min(10, 'El número de teléfono debe contener al menos 10 dígitos')
        .max(15, 'El número de teléfono debe contener como máximo 15 dígitos'),

    email: Yup.string()
        .optional()
        .email('Formato de email inválido'),

    considerations: Yup.string()
        .optional(),

    daysPerWeek: Yup.number()
        .required('Debe indicar los días a la semana')
});

export const UserForm = () => {
    const { loading, callEndpoint } = useService<CreateUserResponse>();
    const router = useRouter();

    const handleFormSubmit = async (values: UserRegistrationFormValues) => {
        const response = await callEndpoint(await userService.createUser({
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            age: values.age,
            phone: values.phone,
            email: values.email,
            considerations: values.considerations,
            daysPerWeek: values.daysPerWeek
        } as CreateUserRequest));
        if (response.data.id) {
            // TO DO: show snackbar message and go back to list
            router.push(paths.index);
        }
    }

    return (
        <Stack spacing={3}>
            {
                loading ?
                    <Box>
                        <LinearProgress sx={{ mt: 5 }} />
                    </Box>
                    :
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={formValidationSchema}
                        onSubmit={handleFormSubmit}>
                        <Form>
                            <UserFormBody />
                            <Button sx={{ mt: 2 }} type="submit" variant="contained" fullWidth>Registrar</Button>
                        </Form>
                    </Formik>
            }
        </Stack>
    )
}