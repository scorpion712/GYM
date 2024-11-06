import { Box, Button, LinearProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { useRouter, useService } from "../../hooks";
import { UserRegistrationFormValues, CreateUserRequest, CreateUserResponse, UserCustomer, GetuserResponse, UpdateUserRequest } from "../../models";
import { userService } from "../../services";
import { paths } from "../../routes/paths";
import { UserFormBody } from "./UserFormBody";
import { SnackBarUtilities } from "../../utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { adaptGetCustomerToCustomer } from "../../adapters";

const formInitialValues = {
    email: "",
    firstName: "",
    lastName: "",
    dni: "",
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

    dni: Yup.string()
        .optional() // TO DO: remove optional
        .matches(/^[0-9]+$/, 'El DNI de teléfono debe contener solo dígitos')
        .min(7, 'El número de DNI debe contener al menos 7 dígitos')
        .max(9, 'El número de DNI debe contener como máximo 9 dígitos'),

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
    const location = useLocation();
    const { loading, callEndpoint } = useService<CreateUserResponse>();
    const { loading: loadingUser, callEndpoint: callEndpointGetUser } = useService<GetuserResponse>();
    const router = useRouter();

    const [customer, setCustomer] = useState<UserCustomer | null>(null);

    const createUser = async (values: UserRegistrationFormValues) => {
        const response = await callEndpoint(await userService.createUser({
            firstName: values.firstName,
            lastName: values.lastName,
            dni: values.dni,
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

    const updateUser = async (values: UserRegistrationFormValues) => {
        const response = await callEndpoint(await userService.updateUser({
            id: location.state?.userId,
            firstName: values.firstName,
            lastName: values.lastName,
            dni: values.dni,
            age: values.age,
            phone: values.phone,
            email: values.email,
            considerations: values.considerations,
            daysPerWeek: values.daysPerWeek
        } as UpdateUserRequest));
        if (response.data.id) {
            SnackBarUtilities.success("Usuario actualizado correctamente");
            router.push(paths.index);
        }
    }

    const handleFormSubmit = async (values: UserRegistrationFormValues) => {
        if (location.state?.userId) {
            updateUser(values);
        } else {
            createUser(values);
        }
    }

    const fetchUser = async (id: string) => {
        const response = await callEndpointGetUser(await userService.getUser(id));
        if (response.data) {
            setCustomer(adaptGetCustomerToCustomer(response.data));
        }
    }

    useEffect(() => {
        if (location.state?.userId)
            fetchUser(location.state?.userId);
    }, [location.state])

    return (
        <Stack spacing={3}>
            {
                loading || loadingUser ?
                    <Box>
                        <LinearProgress sx={{ mt: 5 }} />
                    </Box>
                    :
                    <Formik
                        initialValues={{
                            ...formInitialValues,
                            firstName: customer ? customer?.firstName ?? "" : "",
                            lastName: customer ? customer?.lastName ?? "" : "",
                            dni: customer ? customer?.dni ?? "" : "",
                            email: customer ? customer?.email ?? "" : "",
                            phone: customer ? customer?.phone ?? "" : "",
                            daysPerWeek: customer ? customer?.daysPerWeek ?? [] : [],
                            considerations: customer ? customer?.considerations ?? "" : ""
                        }}
                        validationSchema={formValidationSchema}
                        onSubmit={handleFormSubmit}
                        enableReinitialize={true}>
                        <Form>
                            <UserFormBody />
                            <Button sx={{ mt: { xs: 2, md: 4 } }} type="submit" variant="contained" fullWidth>Registrar</Button>
                        </Form>
                    </Formik>
            }
        </Stack>
    )
}