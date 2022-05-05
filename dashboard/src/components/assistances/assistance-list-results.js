import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useStyles } from "./styles";
import { statusColor, statusTranslation } from 'src/helpers/assistancesHelpers';
import { SeverityPill } from '../severity-pill';

export const AssistanceListResults = ({ assistances, setLimitPage, setPage, limitPage, page, totalAssistances }) => {
  const classes = useStyles();

  const handleLimitChange = (event) => setLimitPage(event.target.value);
  const handlePageChange = (event, newPage) => setPage(newPage);

  return (
    <>
      <Card className={classes.root}>
        <PerfectScrollbar>
          <Box sx={{ width: "100%" }} >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Usuario
                  </TableCell>
                  <TableCell>
                    Mecánico
                  </TableCell>
                  <TableCell>
                    Destino
                  </TableCell>
                  <TableCell>
                    Estatus
                  </TableCell>
                  <TableCell>
                    Cancelada por
                  </TableCell>
                  <TableCell>
                    Fecha y hora
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assistances.map((assistance, index) => (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>
                      {assistance.userFullName}
                    </TableCell>
                    <TableCell>
                      {assistance.mechanicFullName}
                    </TableCell>
                    <TableCell>
                      {`
                          ${ assistance?.destinationAddress?.country || "País desconocido" }.
                          ${ assistance?.destinationAddress?.city || "Ciudad desconocida" }.
                          C.P. ${ assistance?.destinationAddress?.postcode || "desconocido" }.
                          ${ assistance?.destinationAddress?.neighbourhood || "" }
                          ${ assistance?.destinationAddress?.road || "" }
                          ${ assistance?.destinationAddress?.tourism || "" }
                       `
                      }
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusColor[assistance.status]}>
                        {statusTranslation[assistance.status]}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      {assistance.cancelled || "No aplica"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(assistance?.createdAt), "yyyy-MM-dd HH:MM:SS")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={totalAssistances}
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

AssistanceListResults.propTypes = {
  assistances: PropTypes.array.isRequired
};

