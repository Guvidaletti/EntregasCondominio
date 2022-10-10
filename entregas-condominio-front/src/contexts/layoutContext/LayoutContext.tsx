import {
  Toast,
  TopLoader,
  useModalManager,
  useToastManager,
} from 'plataforma-fundacao-componentes';
import { createContext, useContext, Fragment } from 'react';

import { AuthContext } from 'contexts/authContext/AuthContext';

interface LayoutType {
  openModal: <
    C extends React.ElementType<any>,
    P extends React.ComponentProps<C>
  >(
    _component: C,
    _modalProps: P
  ) => void;
  closeModal: (_modalKey: string | number) => void;
  showToast: (_toast: React.ComponentProps<typeof Toast>) => void;
  clearToasts: () => void;
}

export const LayoutContext = createContext<LayoutType>({
  openModal: <
    C extends React.ElementType<any>,
    P extends React.ComponentProps<C>
  >(
    _component: C,
    _modalProps: P
  ) => {},
  closeModal: (_modalKey: string | number) => {},
  showToast: (_toast: React.ComponentProps<typeof Toast>) => {},
  clearToasts: () => {},
});

export default function LayoutProvider({ children }: any) {
  const { carregandoDados } = useContext(AuthContext);
  const [ModalManager, openModal, closeModal] = useModalManager();
  const [ToastManager, showToast, clearToasts] = useToastManager({
    verticalPosition: 'top',
    horizontalPosition: 'right',
    animateSize: false,
    marginTop: '12px',
    max: 50,
    pauseOnFocusLoss: true,
    reverse: true,
  });

  return (
    <LayoutContext.Provider
      value={{ openModal, closeModal, showToast, clearToasts }}
    >
      <Fragment>
        {children}
        {ModalManager}
        {ToastManager}
        <TopLoader
          opened={Boolean(carregandoDados)}
          status={
            typeof carregandoDados === 'string' ? carregandoDados : undefined
          }
        />
      </Fragment>
    </LayoutContext.Provider>
  );
}
