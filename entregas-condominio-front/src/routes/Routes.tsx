import Layout from 'components/layout/Layout';
import Dashboard from 'pages/dashboard/Dashboard';
import Entregas from 'pages/entregas/Entregas';
import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import Moradores from 'pages/moradores/Moradores';
import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom';

export const Paths = {
  login: '/',
  home: '/home',
  entregas: '/entregas',
  moradores: '/moradores',
  dashboard: '/dashboard',
};

export default function Routes() {
  return (
    <Layout>
      <ReactRouterDomRoutes>
        <Route path={Paths.home} element={<Home />} />
        <Route path={Paths.entregas} element={<Entregas />} />
        <Route path={Paths.moradores} element={<Moradores />} />
        <Route path={Paths.dashboard} element={<Dashboard />} />
        <Route path={Paths.login} element={<Login />} />
      </ReactRouterDomRoutes>
    </Layout>
  );
}
