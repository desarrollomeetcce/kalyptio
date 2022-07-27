import { Button, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import { createRef } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from "./Pages/Main";
import NavBar from "./Components/NavBar";

/**
 * Tema principal y paleta de colores
 */

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#6b8aa0',
      contrastText: '#000000',
    },
   // background: '#dbd7d7'

  },
});

/**
 * Componente principal del proyecto
 * @returns 
 */
function App() {
  /**
  * Referencia para poder usar las notificaciones
  */
  const notistackRef = createRef();

  /**
  * Cierra la notificacion
  * @param {*} key 
  * @returns 
  */
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  }


  return (

    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <SnackbarProvider
        maxSnack={5}
        ref={notistackRef}
        /**
         * Agrega el botón de cerrar para todas las notificaciones
         */
        action={(key) => (
          <Button onClick={onClickDismiss(key)}>
            Cerrar
          </Button>
        )}
      >
        <NavBar />
        {/** Enrutamiento de la aplicación */}
        <BrowserRouter>

            <Routes>
              {/** Ruta principal de la aplicacion */}
              <Route path="/" element={<Main theme={theme}/>}>
                <Route index element={<Main theme={theme}/>} />

              </Route>

              {/**Ruta del MensajeEnvio 
                s<Route path="/mensajeEnvio" element={<MensajeEnvio theme={theme}/>} />
              */}

            </Routes>



          </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
