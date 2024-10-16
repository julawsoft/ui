import { Suspense } from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import Loader from './pages/Loader';
import Router from './routes/Router';
import { ToastNotification } from './components/ToastNotification';

function App() {

  return (
    <BrowserRouter>
      <ToastNotification />
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
