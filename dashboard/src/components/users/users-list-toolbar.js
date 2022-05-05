import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, Select, MenuItem, InputLabel, FormControl, Grid
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';

export const UserListToolbar = ({ search, setSearch }) => {
  const handleChangeRoleSearch = (event) => {
    setSearch({ ...search, role: event.target.value });
  };

  const handlerChangeName = (event) => {
    clearTimeout(searchTimer);

    const searchTimer = setTimeout(() => {
      setSearch({ ...search, name: event.target.value });
    }, 500);
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Usuarios
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2} display="flex" justifyContent="space-between">
              <Grid item xs={12} md={8}>
                <TextField
                  onChange={handlerChangeName}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Buscar por nombre"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="electRoleLabel">Rol</InputLabel>
                  <Select
                    labelId="User Roles"
                    id="electRoleLabel"
                    value={search.role}
                    label="Rol"
                    onChange={handleChangeRoleSearch}
                  >
                    <MenuItem value={"all"}>Todos</MenuItem>
                    <MenuItem value={"user"}>Usuario</MenuItem>
                    <MenuItem value={"mechanic"}>Mecánico</MenuItem>
                    <MenuItem value={"admin"}>Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
