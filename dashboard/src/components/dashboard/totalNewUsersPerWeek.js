import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export const TotalNewUsersPerWeek = (props) => (
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
            Nuevos usuarios esta semana
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.totalNewUserThisWeek | 0}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SentimentSatisfiedAltIcon />
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
          {(props.totalNewUserThisWeek / props.totalUsers) * 100 | 0}%
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
