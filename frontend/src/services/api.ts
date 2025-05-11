import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Auth (simulated)
export const login = async (token: string) => {
  localStorage.setItem('authToken', token);
  return true;
};

// Dashboard API
export const getDashboardData = async () => {
  const res = await api.get('/dashboard');
  return res.data;
};

// Students APIs
export const getStudents = async () => {
  const res = await api.get('/students');
  return res.data;
};

export const addStudent = async (student: any) => {
  const res = await api.post('/students', student);
  return res.data;
};

export const bulkUploadStudents = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/students/bulk', formData);
  return res.data;
};

// Vaccination Drive APIs
export const getDrives = async () => {
  const res = await api.get('/drives');
  return res.data;
};

export const createDrive = async (drive: any) => {
  const res = await api.post('/drives', drive);
  return res.data;
};

export const updateDrive = async (id: string, drive: any) => {
  const res = await api.put(`/drives/${id}`, drive);
  return res.data;
};

// Reports APIs
export const getReports = async (filter?: string) => {
  const res = await api.get('/reports', { params: { filter } });
  return res.data;
};

export const exportReportCSV = async () => {
  const res = await api.get('/reports/export', {
    params: { format: 'csv' },
    responseType: 'blob',
  });
  return res.data;
};
