import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import { Fragment } from 'react';
import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const Paths = {
  login: '/',
  home: '/home',
};

export default function Routes() {
  return (
    <Fragment>
      <ReactRouterDomRoutes>
        <Route path={Paths.home} element={<Home />} />
        <Route path={Paths.login} element={<Login />} />
      </ReactRouterDomRoutes>
      <ToastContainer />
    </Fragment>
  );
}
