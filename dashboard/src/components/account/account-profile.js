import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import Stars from 'simple-rating-stars';

export const AccountProfile = ({ userInfo }) => {

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={userInfo.user?.photo || "/static/images/avatars/generic_user_avatar.png"}
            sx={{ height: 64, mb: 2, width: 64 }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            textAlign="center"
          >
            {`${ userInfo?.user?.name } ${ userInfo.user?.lastName }`}
          </Typography>
          <Stars
            stars={Math.round(userInfo.user?.scoreAverage) || 0}
            outOf={5}
            full="#Ffda00"
            empty="#E1F1FF"
            stroke="#369"
          />
          <br />
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Miembro desde el {format(new Date(userInfo.user?.createdAt || Date.now()), "yyyy-MM-dd")}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};
