import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/default.scss';
import 'plataforma-fundacao-componentes/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/authContext/AuthContext';
import reportWebVitals from './reportWebVitals';
import Routes from './routes/Routes';
import LayoutProvider from 'contexts/layoutContext/LayoutContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <LayoutProvider>
        <Routes />
      </LayoutProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
