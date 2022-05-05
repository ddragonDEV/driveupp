import Head from 'next/head';
import { Container, Button, Grid, Typography, TextField } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number';
import { getValidationSchema, initialValues } from "../components/registerMechanic/helper";
import { useInformation } from 'src/components/information/useInformation';
import { useAlert } from 'src/components/alert/useAlert';
import { validate } from 'rut.js';

const RegisterMechanic = () => {
  const router = useRouter();
  const { createNewMechanic, user } = useInformation();
  const { handleShowAlert } = useAlert();

  const onSubmit = async (values) => {
    const completeValues = { ...values, phone: values.phone.replace("+", ""), photo: "" };
    if (!validate(values.rut)) {
      handleShowAlert("El RUT no es válido", true);
      return;
    }

    const newMechanic = await createNewMechanic(completeValues);
    if (newMechanic) router.push("/users");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(),
    onSubmit
  });

  return (
    <>
      <Head>
        <title>
          Innmov | Registrar mecánicos
        </title>
      </Head>
      <Container maxWidth="md" >
        <Grid
          container
          spacing={2}
          width="100%"
        >
          <Grid item xs={12}>
            <Typography sx={{ m: 1 }} variant="h4">
              Registro
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <MuiPhoneNumber
              key="phoneNumberInput"
              onChange={value => formik.setFieldValue("phone", value)}
              error={formik.errors.phone}
              value={formik.values.phone}
              touched={formik.touched.phone}
              helperText={formik.touched.phone && formik.errors.phone}
              defaultCountry={'pe'}
              disableDropdown={false}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              key="rutInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.rut}
              value={formik.values.rut}
              touched={formik.touched.rut}
              helperText={formik.touched.rut && formik.errors.rut}
              fullWidth
              label="RUT"
              margin="normal"
              name="rut"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              key="nameInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              value={formik.values.name}
              touched={formik.touched.name}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              label="Nombre"
              margin="normal"
              name="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              key="lastNameInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              value={formik.values.lastName}
              touched={formik.touched.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
              fullWidth
              label="Apellido"
              margin="normal"
              name="lastName"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              key="emailInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              value={formik.values.email}
              touched={formik.touched.email}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              label="Correo electrónico"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              key="passwordInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              value={formik.values.password}
              touched={formik.touched.password}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              label="Contraseña"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={formik.handleSubmit}
            >
              Registrar
            </Button>

          </Grid>
        </Grid>
      </Container>
    </>
  );
};

RegisterMechanic.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default RegisterMechanic;
