import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { Cog as CogIcon } from '../../icons/cog';
import { Users as UsersIcon } from '../../icons/users';
import { NavItem } from '../nav-item';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { ImageLogo } from "./components-styled";

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Inicio'
  },
  {
    href: '/register-mechanic',
    icon: (<HowToRegIcon fontSize="small" />),
    title: 'Registrar mecánicos'
  },
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Usuarios'
  },
  {
    href: '/assistances',
    icon: (<CogIcon fontSize="small" />),
    title: 'Asistencias'
  },
  {
    href: '/analytics',
    icon: (<AutoGraphIcon fontSize="small" />),
    title: 'Analytics'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ textAlign: "center" }} >
            <NextLink
              href="/"
              passHref
            >
              <ImageLogo src="/static/logoApp.png?w=248px&fit=crop&auto=format"
                alt="Innmov App"
                loading="lazy"
              />
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>

      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
