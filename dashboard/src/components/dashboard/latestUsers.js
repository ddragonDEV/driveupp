import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';

export const LatestUsers = (props) => {
  const router = useRouter();
  const listNewUsers = Array.from(props.lastNewUsers);

  return (
    <Card {...props}>
      <CardHeader
        subtitle={``}
        title="Últimos usuarios"
      />
      <Divider />
      <List>
        {listNewUsers.map((userInfo, index) => (
          <ListItem
            divider={index < (listNewUsers.length || 0) - 1}
            key={index}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  ml: 1
                }}
                src={userInfo.photo || "/static/images/avatars/generic_user_avatar.png"}
              >
                <UserCircleIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={userInfo.fullName}
              secondary={`${ formatDistanceToNow(new Date(userInfo.createdAt), {
                addSuffix: true, locale: {
                  formatDistance: (...value) => {
                    return `Hace aproximádamente ${ value[1] } 
                    ${ value[0] === "xMinutes" ? "minutos" :
                        value[0] === "aboutXHours" ? "horas" :
                          value[0] === "xDays" ? "días" :
                            value[0] === "xWeeks" ? "semanas" :
                              value[0] === "xMonths" ? "meses" :
                                "años"
                      }`;
                  }
                }
              }) }`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={() => router.push('/users')}
        >
          Ver más
        </Button>
      </Box>
    </Card >
  );
};
