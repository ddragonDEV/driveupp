import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Backdrop from '@mui/material/Backdrop';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Fade,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { modalConfigContent, useStyles } from "./styles";
import { AccountProfileDetails } from '../account/account-profile-details';
import { AccountProfile } from '../account/account-profile';
import { useInformation } from '../information/useInformation';
import { translateRole } from 'src/helpers/usersHelper';

export const UserListResults = ({ users, setLimitPage, setPage, limitPage, page, totalUsers }) => {
  const classes = useStyles();
  const { searchUserById, userSelectedInfo } = useInformation();
  const [openModal, setOpenModal] = useState(false);
  const [indexSelectedUser, setIndexSelectedUser] = useState(0);

  const handleLimitChange = (event) => setLimitPage(event.target.value);
  const handlePageChange = (event, newPage) => setPage(newPage);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={modalConfigContent}>
            <Grid container spacing={3}>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <AccountProfile userInfo={userSelectedInfo} />
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <AccountProfileDetails
                  indexSelectedUser={indexSelectedUser}
                  userInfo={userSelectedInfo}
                  closeModal={handleCloseModal}
                />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>

      <Card className={classes.root}>
        <PerfectScrollbar>
          <Box sx={{ width: "100%" }} >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    RUT
                  </TableCell>
                  <TableCell>
                    Nombre
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Fecha de registro
                  </TableCell>
                  <TableCell>
                    Puntuación
                  </TableCell>
                  <TableCell>
                    Rol
                  </TableCell>
                  <TableCell>
                    Eliminado
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    hover
                    key={user._id}
                    onClick={async () => {
                      setIndexSelectedUser(index);
                      await searchUserById(user._id);
                      handleOpenModal();
                    }}
                  >
                    <TableCell>
                      {user.rut}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          style={{ backgroundColor: "#5F23FF" }}
                          src={user.photo}
                          sx={{ mr: 2 }}
                        >
                          {getInitials(user.fullName)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {user.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {format(new Date(user?.createdAt), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      {Number(user?.scoreAverage || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {translateRole[user.role]}
                    </TableCell>
                    <TableCell>
                      {!!user?.deleted ? "Sí" : "No"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={totalUsers}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limitPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

UserListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
