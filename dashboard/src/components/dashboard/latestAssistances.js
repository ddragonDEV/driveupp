import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { statusColor, statusTranslation } from 'src/helpers/assistancesHelpers';

export const LatestAssistances = (props) => {
  const router = useRouter();


  return (
    <Card {...props}>
      <CardHeader title="Últimas asistencias" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Usuario
                </TableCell>
                <TableCell>
                  Mecánico
                </TableCell>
                <TableCell sortDirection="desc">
                  Fecha
                </TableCell>
                <TableCell>
                  Estatus
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(props.assistances).map((dataAssistance, index) => (
                <TableRow
                  hover
                  key={dataAssistance._id || index}
                >
                  <TableCell>
                    {dataAssistance.userFullName}
                  </TableCell>
                  <TableCell>
                    {dataAssistance.mechanicFullName}
                  </TableCell>
                  <TableCell>
                    {format(new Date(dataAssistance.createdAt), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <SeverityPill color={statusColor[dataAssistance.status]}>
                      {statusTranslation[dataAssistance.status]}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
          onClick={() => router.push('/assistances')}
        >
          Ver más
        </Button>
      </Box>
    </Card>
  );
};
