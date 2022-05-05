import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { TotalDeletedUsersCard } from '../components/dashboard/totalDeletedUsersCard';
import { LatestAssistances } from '../components/dashboard/latestAssistances';
import { LatestUsers } from '../components/dashboard/latestUsers';
import { TotalUsersActive } from '../components/dashboard/totalUsersActive';
import { TotalUsersComponent } from '../components/dashboard/totalUsers';
import { TotalNewUsersPerWeek } from '../components/dashboard/totalNewUsersPerWeek';
import { DashboardLayout } from '../components/dashboard-layout';
import { useInformation } from "src/components/information/useInformation";
import { useEffect } from 'react';


const Dashboard = () => {
  const { fetchIndex, totalUsers, lastUsers, lastAsssitances } = useInformation();

  useEffect(async () => {
    await fetchIndex();
  }, []);

  return (
    <>
      <Head>
        <title>
          Innmov dashboard
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container>
          <h2>Panorama general</h2>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalUsersComponent totalUsers={totalUsers.totalUsers} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalUsersActive
                totalUsersActive={totalUsers.activeUsers}
                totalUsers={totalUsers.totalUsers} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalDeletedUsersCard
                totalDeletedUsers={totalUsers.deletedUsers}
                totalUsers={totalUsers.totalUsers} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalNewUsersPerWeek sx={{ height: '100%' }}
                totalUsers={totalUsers.totalUsers}
                totalNewUserThisWeek={totalUsers.newUsersInLastWeek} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <LatestUsers sx={{ height: '100%' }} lastNewUsers={lastUsers} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestAssistances assistances={lastAsssitances || []} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
