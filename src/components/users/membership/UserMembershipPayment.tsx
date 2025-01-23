import { Box, Button, LinearProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { RegisterUserPaymentRequest, RegisterUserPaymentResponse, UserMembershipPaymentFormValues } from "../../../models";
import { MembershipPaymentFormBody } from "./MembershipPaymentFormBody";
import { SnackBarUtilities } from "../../../utils";
import { usePopUp, useService } from "../../../hooks";
import { membershipService } from "../../../services";
import { primary } from "../../../theme/colors";

interface UserMembershipPaymentProps {
    id: string;
    daysPerWeek: boolean[];
}

const formInitialValues = {
    daysPerWeek: [true, true, true, true, true],
    date: new Date(),
} as UserMembershipPaymentFormValues;

const formValidationSchema = Yup.object().shape({
    total: Yup.number()
        .typeError('El total debe ser un número')
        .required('El total es requerido')
        .positive('El total debe ser un número positivo'),
    daysPerWeek: Yup.array()
        .of(Yup.boolean())
        .test('at-least-one-true', 'Al menos debe seleccionar un día', (value) => {
            return value && value.some(day => day === true);
        })
        .required('Al menos debe seleccionar un día'),
});

export const UserMembershipPayment = (props: UserMembershipPaymentProps) => {
    const { id, daysPerWeek } = props;

    const { loading, callEndpoint } = useService<RegisterUserPaymentResponse>();
    const { closePopUp } = usePopUp();

    const handleFormSubmit = async (values: UserMembershipPaymentFormValues) => {
        const response = await callEndpoint(await membershipService.pay({
            userId: id,
            date: values.date,
            amount: values.total,
            timesPerWeek: values.daysPerWeek.filter(Boolean).length
        } as RegisterUserPaymentRequest));
        if (response.data.id) {
            SnackBarUtilities.success("Se ha registrado la mensualidad de pago correctamente");
            closePopUp();
        }
    }

    if (loading)
        return (
            <Box>
                <LinearProgress sx={{ mt: 5 }} />
            </Box>
        );

    return (
        <Formik initialValues={{ ...formInitialValues, daysPerWeek }}
            onSubmit={handleFormSubmit}
            validationSchema={formValidationSchema}>
            <Form>
                <MembershipPaymentFormBody />
                <Button type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, color: "white", backgroundColor: primary.main }} >
                    Registrar
                </Button>
            </Form>
        </Formik>
    )
}