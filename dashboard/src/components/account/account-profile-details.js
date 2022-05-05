import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { translateRole } from 'src/helpers/usersHelper';
import { useInformation } from '../information/useInformation';

export const AccountProfileDetails = ({ userInfo, closeModal, indexSelectedUser }) => {
  const { changeUserStatus } = useInformation();

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card color="primary">
        <CardHeader
          title="Perfil del usuario"
          subheader={`Rol: ${ translateRole[userInfo?.user?.role] }`}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                required
                value={userInfo?.user?.name}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Apellido"
                name="lastName"
                required
                value={userInfo?.user?.lastName}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                required
                value={userInfo?.user?.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                type="number"
                value={userInfo?.user?.phone}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="RUT"
                name="rut"
                required
                value={userInfo?.user?.rut}
                variant="outlined"
                disabled
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">Total de asistencias</Typography>
              <p>
                <br />
                <span><b>Completadas:</b> {`${ userInfo?.totalAssistances[0].completed }` || 0} </span>&nbsp;|&nbsp;
                <span><b>En progreso:</b> {`${ userInfo?.totalAssistances[0].inProcess }` || 0} </span>&nbsp;|&nbsp;
                <span><b>Canceladas: </b> {`${ userInfo?.totalAssistances[0].canceled }` || 0} </span>&nbsp;|&nbsp;
                <span><b>Abortadas: </b>{`${ userInfo?.totalAssistances[0].aborted }` || 0} </span>
              </p>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color={!userInfo.user.deleted ? "error" : "warning"}
            variant="contained"
            onClick={() => {
              changeUserStatus(indexSelectedUser, userInfo?.user?._id, !userInfo.user.deleted);
              closeModal();
            }}
          >
            {!userInfo.user.deleted ? "Dar de baja" : "Habilitar usuario"}
          </Button>
          &nbsp;&nbsp;
          <Button
            color="secondary"
            variant="contained"
            onClick={closeModal}
          >
            Aceptar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
