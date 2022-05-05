import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AssistanceListResults } from '../components/assistances/assistance-list-results';
import { AssistanceListToolbar } from '../components/assistances/assistance-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useInformation } from 'src/components/information/useInformation';
import { useEffect, useState } from 'react';

const Assistances = () => {
  const { fetchAssistancesWithFilter, assistances } = useInformation();

  const [limitPage, setLimitPage] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({ name: "", status: "all" });

  useEffect(async () => {
    await fetchAssistancesWithFilter({
      rowsPerPage: limitPage,
      page: page + 1,
      ...search
    });
  }, [limitPage, page, search]);

  return (
    <>
      <Head>
        <title>
          Innmov | Asistencias
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <AssistanceListToolbar
            search={search}
            setSearch={setSearch}
          />
          <Box sx={{ mt: 3 }}>
            <AssistanceListResults
              assistances={assistances.list}
              totalAssistances={assistances.totalItems}
              setLimitPage={setLimitPage}
              setPage={setPage}
              limitPage={limitPage}
              page={page}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Assistances.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Assistances;
