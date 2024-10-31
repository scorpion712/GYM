import { Box, Container, Grid2, LinearProgress,Typography } from "@mui/material";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { LoginForm, Seo } from "../../../components";
import { paths } from "../../../routes/paths";
import { LoginFormValues, LoginResponse } from "../../../models";
import { useRouter, useService, useAuth } from "../../../hooks";
import { authService } from "../../../services"; 
import { SnackBarUtilities } from "../../../utils";

const formInitialValues = {
  email: "",
  password: "",
};

const formValidationSchema = Yup.object({
  email: Yup.string().email('Ingrese un email válido').max(255).required('El email es requerido'),
  password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres").max(8, "La contraseña puede tener hasta 8 caracteres").required('La contraseña es requerida'),
});

const LoginPage = () => {

  const auth = useAuth();
  const router = useRouter();
  const location = useLocation();

  const { loading, callEndpoint } = useService<LoginResponse>();

  const handleFormSubmit = async (values: LoginFormValues) => {
    const response = await callEndpoint(await authService.logIn(values.email, values.password));
    if (response) {
      auth.signIn(response.data);
      navigateToHome();
    } else {
      SnackBarUtilities.error("Error al iniciar sesión");
    }
  }

  const navigateToHome = () => {
    const callbackRoute = location.state?.callbackURL ?? "";
    router.push(callbackRoute ? callbackRoute : paths.index, {});
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigateToHome();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Seo title="Iniciar Sesión" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          p: 5
        }}
      >
        <Container maxWidth="lg">
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <Typography variant="h3" mt={{ xs: 0, md: 4 }} gutterBottom>Bienvenido</Typography>
              {loading ?
                <Box>
                  <LinearProgress sx={{ mt: 5 }} />
                </Box>
                :
                <Formik
                  initialValues={formInitialValues}
                  validationSchema={formValidationSchema}
                  onSubmit={handleFormSubmit}
                >
                  <Form>
                    <LoginForm />
                  </Form>
                </Formik>}
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;