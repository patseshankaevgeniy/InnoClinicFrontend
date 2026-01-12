import { RouteObject, Navigate } from 'react-router-dom';
import { LoginForm } from '../modules/auth/components/login-form/login-form';
import { ProtectedRoute } from '../routes/protected-routes';
import { AdminContext } from '../modules/admin/pages/dasboard/admin-context';
import { DoctorContext } from '../modules/doctor/components/doctor-context';
import { PatientContext } from '../modules/patient/components/patient-context';

export const getRoutes = (user: any): RouteObject[] => [
  {
    path: '/login',
    element: user ? <Navigate to="/" replace /> : <LoginForm />
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <AdminContext />
      </ProtectedRoute>
    )
  },
  {
    path: '/doctor',
    element: (
      <ProtectedRoute allowedRoles={['Doctor']}>
        <DoctorContext />
      </ProtectedRoute>
    )
  },
  {
    path: '/patient',
    element: (
      <ProtectedRoute allowedRoles={['Patient']}>
        <PatientContext />
      </ProtectedRoute>
    )
  },
  {
    path: '/',
    element: user ? (
      <Navigate to={user.role === 'Admin' ? '/admin' : user.role === 'Doctor' ? '/doctor' : '/patient'} replace />
    ) : (
      <Navigate to="/login" replace />
    )
  }
];