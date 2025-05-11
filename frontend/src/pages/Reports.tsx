import React, { useEffect, useState } from 'react';
import { getReports, exportReportCSV } from '../services/api';
import {
  Box, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, CircularProgress, Button, TablePagination
} from '@mui/material';
import { saveAs } from 'file-saver';
import vaccineSchool from '../components/images/vaccineSchool.png';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await getReports(filter);
      setReports(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const blob = await exportReportCSV();
    saveAs(blob, 'vaccination_report.csv');
  };

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
        p={3}
        sx={{
            minHeight: '100vh',
            backgroundImage: `url(${vaccineSchool})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
    >
      <Typography variant="h4" gutterBottom>Reports</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Filter by Vaccine"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
            width: '300px',
          }}
        />
        <Button variant="contained" onClick={handleDownload}>Download CSV</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Vaccine</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.vaccination_status}</TableCell>
                    <TableCell>{r.vaccine_name}</TableCell>
                    <TableCell>{r.date_of_vaccination}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={reports.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Reports;