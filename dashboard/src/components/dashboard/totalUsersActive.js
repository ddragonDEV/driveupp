import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';

export const TotalUsersActive = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
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
            Total de usuarios activos
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.totalUsersActive || 0}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <MoodIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{ mr: 1 }}
          variant="body2"
        >
          {(props.totalUsersActive / props.totalUsers) * 100 | 0}%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          del total
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
