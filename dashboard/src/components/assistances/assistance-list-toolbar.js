import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, Select, MenuItem, InputLabel, FormControl, Grid
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { useState } from "react";

export const AssistanceListToolbar = ({ search, setSearch }) => {
  const handlerChangeName = (event) => {
    clearTimeout(searchTimer);

    const searchTimer = setTimeout(() => {
      setSearch({ ...search, name: event.target.value });
    }, 500);
  };


  const handleChangeStatusSearch = (event) => {
    setSearch({ ...search, status: event.target.value });
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
          Asistencias
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
                  <InputLabel id="electRoleLabel">Estatus</InputLabel>
                  <Select
                    labelId="EstatusAssistances"
                    id="electRoleLabel"
                    value={search.status}
                    label="Estatus"
                    onChange={handleChangeStatusSearch}
                  >
                    <MenuItem value={"all"}>Todas</MenuItem>
                    <MenuItem value={"Completed"}>Completadas</MenuItem>
                    <MenuItem value={"InProcess"}>En proceso</MenuItem>
                    <MenuItem value={"Canceled"}>Canceladas</MenuItem>
                    <MenuItem value={"Aborted"}>Abortadas (errores)</MenuItem>
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
