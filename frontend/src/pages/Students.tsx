import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Paper, Button, TextField,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  CircularProgress, InputLabel, Select, MenuItem, FormControl,
  Snackbar, Alert
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { addStudent, bulkUploadStudents, getStudents } from '../services/api';
import kdarfsSchoolImg from '../components/images/studentimage.png';


const Students: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [studentSnackbarOpen, setStudentSnackbarOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents();
      setStudents(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await addStudent(data);
      reset();
      fetchStudents();
      setStudentSnackbarOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkUpload = async () => {
    if (csvFile) {
      try {
        await bulkUploadStudents(csvFile);
        setCsvFile(null);
        fetchStudents();
        setUploadSnackbarOpen(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Box
      p={3}
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${kdarfsSchoolImg})`, //
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>Student Management</Typography>
      <Grid container spacing={3}>
        {/* Add Student Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: 'rgba(255,255,255,0.9)' }}>
            <Typography variant="h6">Add Student</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField label="Name" fullWidth margin="normal" {...register('name')} required />
              <TextField label="Class" fullWidth margin="normal" {...register('class')} required />
              <TextField label="Section" fullWidth margin="normal" {...register('section')} required />

              <FormControl fullWidth margin="normal" required>
                <Select
                  displayEmpty
                  defaultValue=""
                  {...register('vaccination_status')}
                  onChange={(e) => setValue('vaccination_status', e.target.value)}
                >
                  <MenuItem value="" disabled>Vaccination Status</MenuItem>
                  <MenuItem value="Vaccinated">Vaccinated</MenuItem>
                  <MenuItem value="Non-Vaccinated">Non-Vaccinated</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" required>
                <Select
                  displayEmpty
                  defaultValue=""
                  {...register('vaccine_name')}
                  onChange={(e) => setValue('vaccine_name', e.target.value)}
                >
                  <MenuItem value="" disabled>Vaccine Name</MenuItem>
                  <MenuItem value="Moderna">Moderna</MenuItem>
                  <MenuItem value="Pfizer">Pfizer</MenuItem>
                  <MenuItem value="Covaxin">Covaxin</MenuItem>
                  <MenuItem value="Covishield">Covishield</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Date of Vaccination"
                type="date"
                fullWidth
                margin="normal"
                {...register('date_of_vaccination')}
                InputLabelProps={{ shrink: true }}
                required
              />
              <Button type="submit" variant="contained">Add Student</Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: 'rgba(255,255,255,0.9)' }}>
            <Typography variant="h6">Bulk Upload</Typography>
            <InputLabel>Upload CSV File</InputLabel>
            <input type="file" accept=".csv" onChange={(e) => e.target.files && setCsvFile(e.target.files[0])} />
            <Button onClick={handleBulkUpload} variant="contained" sx={{ mt: 2 }}>Upload</Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 2, backgroundColor: 'rgba(255,255,255,0.9)' }}>
            <Typography variant="h6">Student List</Typography>
            {loading ? <CircularProgress /> : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Section</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Vaccine</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.class}</TableCell>
                        <TableCell>{s.section}</TableCell>
                        <TableCell>{s.vaccination_status}</TableCell>
                        <TableCell>{s.vaccine_name}</TableCell>
                        <TableCell>{s.date_of_vaccination}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={uploadSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setUploadSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setUploadSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Bulk upload successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={studentSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setStudentSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setStudentSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Student added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Students;
