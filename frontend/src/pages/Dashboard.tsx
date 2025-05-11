import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  const vaccinatedStats = data.vaccinated_students || 0;
  const totalStats = data.total_students || 0;
  const nonVaccinatedStats = totalStats - vaccinatedStats;

  // Pie chart calculations
  const vaccinatedPercentage = (vaccinatedStats / totalStats) * 100;
  const nonVaccinatedPercentage = 100 - vaccinatedPercentage;

  // Pie chart path calculations (for the SVG arc)
  const radius = 50; // radius of the pie chart
  const circumference = 2 * Math.PI * radius;
  const vaccinatedStrokeLength = (vaccinatedPercentage / 100) * circumference;
  const nonVaccinatedStrokeLength = circumference - vaccinatedStrokeLength;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h5">{data.total_students}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Vaccinated</Typography>
            <Typography variant="h5">{vaccinatedStats.toFixed(2)} ({vaccinatedPercentage.toFixed(2)}%)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Upcoming Drives</Typography>
            {data.upcoming_drives?.length ? data.upcoming_drives.map((drive: any) => (
              <Typography key={drive.id}>
                {dayjs(drive.date).format('MMM D, YYYY')} - {drive.vaccine_name} ({drive.vaccines_available} doses)
              </Typography>
            )) : <Typography>No upcoming drives</Typography>}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Students Distribution</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r={radius} stroke="lightgray" strokeWidth="15" fill="none" />
                        <circle
                          cx="60"
                          cy="60"
                          r={radius}
                          stroke="green"
                          strokeWidth="15"
                          fill="none"
                          strokeDasharray={vaccinatedStrokeLength + " " + nonVaccinatedStrokeLength}
                          strokeDashoffset="25"
                        />
                        <text x="50%" y="50%" textAnchor="middle" stroke="black" strokeWidth="1px" dy=".3em" fontSize="18px">
                          {vaccinatedPercentage.toFixed(2)}%
                        </text>
                      </svg>
                    </Box>
                    <Typography>{vaccinatedPercentage.toFixed(2)}% Vaccinated</Typography>
                    <Typography>{nonVaccinatedPercentage.toFixed(2)}% Non-Vaccinated</Typography>
                  </Paper>
                </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
