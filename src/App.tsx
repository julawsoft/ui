import { Suspense } from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import Loader from './pages/Loader';
import Router from './routes/Router';
import { ToastNotification } from './components/ToastNotification';
import { ThemeProvider } from '@emotion/react';
import themeJulaw from './themes/theme';

function App() {

  return (
    <ThemeProvider theme={themeJulaw}>
      <BrowserRouter>
        <ToastNotification />
        <Suspense fallback={<Loader />}>
          <Router />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
