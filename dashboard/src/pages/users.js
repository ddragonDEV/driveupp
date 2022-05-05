import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/users/users-list-results';
import { UserListToolbar } from '../components/users/users-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useInformation } from 'src/components/information/useInformation';
import { useEffect, useState } from 'react';

const Users = () => {
  const { fetchUsersWithFilter, users } = useInformation();

  const [limitPage, setLimitPage] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({ name: "", role: "" });

  useEffect(async () => {
    await fetchUsersWithFilter({
      rowsPerPage: limitPage,
      page: page + 1,
      ...search
    });
  }, [limitPage, page, search]);


  return (
    <>
      <Head>
        <title>
          Innmov | Usuarios
        </title>
      </Head>
      <Box
        component="main"
        sx={{ flexGrow: 1, py: 8 }}
      >
        <Container maxWidth={false}>
          <UserListToolbar
            search={search}
            setSearch={setSearch}
          />
          <Box sx={{ mt: 3 }}>
            <UserListResults
              users={users.list}
              setLimitPage={setLimitPage}
              setPage={setPage}
              limitPage={limitPage}
              page={page}
              totalUsers={users.totalItems}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};


Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
