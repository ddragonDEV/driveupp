import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const TotalDeletedUsersCard = (props) => (
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
            Total de usuarios dados de baja
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.totalDeletedUsers}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SentimentVeryDissatisfiedIcon />
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
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          {(props.totalDeletedUsers / props.totalUsers) * 100 | 0}%
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
