import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SessionsChart } from 'src/components/analytics/sessionsChart';
import { ZoneAssistanceChart } from "src/components/analytics/zoneAssistanceChart";
import { AssistanceByMechanicChart } from 'src/components/analytics/assistancesByMechancChart';

const Analytics = () => {

  return (
    <>
      <Head>
        <title>
          Analytics | Innmov
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Analytics
          </Typography>
          <Box sx={{ pt: 3 }}>
            <SessionsChart />
          </Box>
          <Box sx={{ pt: 3 }}>
            <ZoneAssistanceChart />
          </Box>
          <Box sx={{ pt: 3 }}>
            <AssistanceByMechanicChart />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Analytics.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Analytics;
