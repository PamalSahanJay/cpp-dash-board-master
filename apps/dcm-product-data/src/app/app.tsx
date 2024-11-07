import { Route, Routes } from 'react-router-dom';
import MainProductView from './components/MainProductView';
import { MainLayout } from '@ccp-dashboard/shared-ui';
import { createTheme, ThemeProvider } from '@mui/material';

export function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3b3740',
      },
      secondary: {
        main: '#6f7269',
      },

    },
  });



  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={
          <MainLayout>
            <MainProductView />
          </MainLayout>
        }>
      </Route>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
