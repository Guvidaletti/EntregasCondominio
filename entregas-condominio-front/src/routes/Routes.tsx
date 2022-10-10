import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom';

export const Paths = {
  login: '/',
  home: '/home',
};

export default function Routes() {
  return (
    <ReactRouterDomRoutes>
      <Route path={Paths.home} element={<Home />} />
      <Route path={Paths.login} element={<Login />} />
    </ReactRouterDomRoutes>
  );
}
