import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const TotalUsersComponent = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Total de usuarios en el sistema
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.totalUsers || 0}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <Typography
          color="textSecondary"
          variant="caption"
        >
          * Incluye activos y borrados
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
