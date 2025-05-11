import React, { useEffect, useState } from 'react';
import { createDrive, getDrives, updateDrive } from '../services/api';
import {
  Box, Typography, Grid, Paper, TextField, Button,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import vaccineSchool from '../components/images/vaccineSchool.png';

const Drives: React.FC = () => {
  const [drives, setDrives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDrive, setEditingDrive] = useState<any>(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchDrives = async () => {
    setLoading(true);
    try {
      const res = await getDrives();
      setDrives(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    const driveData = { ...data, vaccines_available: Number(data.vaccines_available) };
    if (editingDrive) {
      await updateDrive(editingDrive.id, driveData);
      setEditingDrive(null);
    } else {
      await createDrive(driveData);
    }
    reset();
    fetchDrives();
  };

  const handleEdit = (drive: any) => {
    setEditingDrive(drive);
    setValue('date', drive.date);
    setValue('vaccines_available', drive.vaccines_available);
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const isEditable = (date: string) => dayjs(date).isAfter(dayjs());

  return (
     <Box
          p={3}
          sx={{
            minHeight: '100vh',
            backgroundImage: `url(${vaccineSchool})`, //
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
      <Typography variant="h4" gutterBottom>Vaccination Drives</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">{editingDrive ? 'Edit Drive' : 'Create New Drive'}</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField label="Date" type="date" fullWidth margin="normal" {...register('date')} InputLabelProps={{ shrink: true }} required />
              <TextField label="Vaccines Available" type="number" fullWidth margin="normal" {...register('vaccines_available')} required />
              <Button type="submit" variant="contained">
                {editingDrive ? 'Update Drive' : 'Create Drive'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Drive List</Typography>
            {loading ? <CircularProgress /> : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Vaccines Available</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {drives.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell>{dayjs(d.date).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{d.vaccines_available}</TableCell>
                        <TableCell>
                          {isEditable(d.date) ? (
                            <Button variant="outlined" onClick={() => handleEdit(d)}>Edit</Button>
                          ) : (
                            <Typography variant="body2">Expired</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Drives;
