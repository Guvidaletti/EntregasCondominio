import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { createUsuario } from 'services/api/usuario';
import { UsuarioType } from '../../typings/typings';

export interface AuthContextType {
  usuario?: UsuarioType;
  carregandoDados?: boolean;
  login: (user: UsuarioType) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType>({
  carregandoDados: false,
  login: (user: UsuarioType) => Promise.reject(),
  logout: () => Promise.reject(),
});

const USUARIO_LOGADO_KEY = 'USUARIO_LOGADO';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioType>();

  useEffect(() => {
    const usuarioSession = sessionStorage.getItem(USUARIO_LOGADO_KEY);
    if (usuarioSession) {
      setUsuario(JSON.parse(usuarioSession) as UsuarioType);
    }
  }, []);

  const login = useCallback((user: UsuarioType) => {
    return new Promise<void>((resolve, reject) => {
      createUsuario(user)
        .then(() => {
          sessionStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(user));
          setUsuario(user);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }, []);

  const logout = useCallback(() => {
    return new Promise<void>((resolve) => {
      sessionStorage.removeItem(USUARIO_LOGADO_KEY);
      resolve();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
