import { Box, Button, LinearProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { useRouter, useService } from "../../hooks";
import { UserRegistrationFormValues, CreateUserRequest, CreateUserResponse } from "../../models";
import { userService } from "../../services";
import { paths } from "../../routes/paths";
import { UserFormBody } from "./UserFormBody";
import { SnackBarUtilities } from "../../utils";

const formInitialValues = {
    email: "",
    firstName: "",
    lastName: "",
    daysPerWeek: [true, true, true, true, true]
} as UserRegistrationFormValues;

const formValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('El nombre es requerido')
        .min(2, 'El nombre debe tener al menos 2 caracteres'),

    lastName: Yup.string()
        .optional()
        .min(2, 'El apellido debe tener al menos 2 caracteres'), 

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

    daysPerWeek: Yup.array()
        .of(Yup.boolean())
        .test('at-least-one-true', 'Al menos debe seleccionar un día', (value) => {
            return value && value.some(day => day === true);
        })
        .required('Al menos debe seleccionar un día'),
});

export const UserForm = () => {
    const { loading, callEndpoint } = useService<CreateUserResponse>();
    const router = useRouter();

    const handleFormSubmit = async (values: UserRegistrationFormValues) => {
        const response = await callEndpoint(await userService.createUser({
            firstName: values.firstName,
            lastName: values.lastName, 
            age: values.age,
            phone: values.phone,
            email: values.email,
            considerations: values.considerations,
            daysPerWeek: values.daysPerWeek
        } as CreateUserRequest));
        if (response.data.id) {
            SnackBarUtilities.success("Usuario creado correctamente");
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
                            <Button sx={{ mt: { xs: 2, md: 4 } }} type="submit" variant="contained" fullWidth>Registrar</Button>
                        </Form>
                    </Formik>
            }
        </Stack>
    )
}