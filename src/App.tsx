import { SnackbarProvider } from 'notistack'
import { useRoutes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { SnackBarUtilitiesConfigurator } from './utils'
import { routes } from './routes'
import { AuthProvider } from './context/auth';
import { createTheme } from './theme';
import { settings } from './theme/settings';
import { PopUpProvider } from './context';

function App() {
  const element = useRoutes(routes);

  const theme = createTheme(settings);

  return (
    <SnackbarProvider>
      <SnackBarUtilitiesConfigurator />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <PopUpProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {element}
            </ThemeProvider>
          </PopUpProvider>
        </AuthProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

export default App