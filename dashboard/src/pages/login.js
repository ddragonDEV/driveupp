import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { loginSchema } from 'src/components/login/helper';
import { useInformation } from 'src/components/information/useInformation';

const Login = () => {
  const router = useRouter();
  const { loginAuthentication } = useInformation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result = await loginAuthentication(values);

      if (result) router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>Iniciar sesión | Innmov</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Innmov Dashboard
              </Typography>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Inicia sesión
              </Typography>
            </Box>

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
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={formik.handleSubmit}
              >
                Acceder
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
