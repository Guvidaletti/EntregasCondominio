import Logo from 'assets/icons/logo';
import { AuthContext } from 'contexts/authContext/AuthContext';
import {
  Button,
  ButtonThemes,
  DropdownItem,
  DropdownMenu,
  FullHeightContainer,
  Header,
  HeaderType,
  IconButton,
} from 'plataforma-fundacao-componentes';
import { ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routes/Routes';

export default function Layout({ children }: { children: ReactNode }) {
  const { usuario, logout } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  return (
    <FullHeightContainer
      header={
        usuario ? (
          <Header
            position='static'
            theme={HeaderType.Branco}
            leftContent={
              <IconButton
                icon={<Logo size={50} hideLetters />}
                onClick={() => {
                  navigate(Paths.home, { replace: false });
                }}
              />
            }
            rightContent={
              <DropdownMenu
                content={
                  <div>
                    <DropdownItem disabled label={usuario.nome} />
                    <DropdownItem
                      label='sair'
                      onClick={() => {
                        setOpened(false);
                        logout().finally(() => {
                          navigate(Paths.login);
                        });
                      }}
                    />
                  </div>
                }
                opened={opened}
                setOpened={setOpened}
              >
                <Button
                  theme={ButtonThemes.HeaderUserSecondary}
                  onClick={() => setOpened(!opened)}
                >
                  <b>{usuario.iniciais}</b>
                </Button>
              </DropdownMenu>
            }
          />
        ) : undefined
      }
    >
      {children}
    </FullHeightContainer>
  );
}
