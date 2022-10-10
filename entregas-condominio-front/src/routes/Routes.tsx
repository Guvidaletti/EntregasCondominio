import { useContext, Fragment } from 'react';
import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext/AuthContext';
import Login from '../pages/login/Login';

export const paths = {
  login: '/',
};

export default function Routes() {
  const authContext = useContext(AuthContext);

  return (
    <ReactRouterDomRoutes>
      {authContext.usuario ? <Fragment>Teste</Fragment> : undefined}
      <Route path={paths.login} element={<Login />} />
      {/* <Route path='about' element={<About />} /> */}
    </ReactRouterDomRoutes>
  );
}
