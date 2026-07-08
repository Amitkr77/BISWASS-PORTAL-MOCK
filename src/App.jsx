import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import { LangProvider } from './hooks/useLang';
import { FontSizeProvider } from './hooks/useFontSize';
import { ROUTES } from './routes';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Report = lazy(() => import('./pages/dashboard/Report'));
const HospitalList = lazy(() => import('./pages/dashboard/HospitalList'));
const VvsReport = lazy(() => import('./pages/dashboard/VvsReport'));
const OperatorReport = lazy(() => import('./pages/dashboard/OperatorReport'));
const Login = lazy(() => import('./pages/Login'));

export default function App() {
  return (
    <LangProvider>
      <FontSizeProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Navigate to="/dashboard/ab-pmjay" replace />} />
              <Route path="/dashboard/reports/:type" element={<Report />} />
              <Route path="/dashboard/:type/hospitals/:district/:hospitalType" element={<HospitalList />} />
              <Route path="/dashboard/vvs/districts-report" element={<VvsReport />} />
              <Route path="/dashboard/operator/districts-report" element={<OperatorReport />} />
              <Route path="/dashboard/:type" element={<Dashboard />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<MainLayout />}>
              {ROUTES.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </FontSizeProvider>
    </LangProvider>
  );
}
