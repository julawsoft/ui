import { Suspense } from 'react';
import { 
  BrowserRouter
} from 'react-router-dom';
import Loader from './pages/Loader';
import Router from './routes/Router';

function App() {

  return (
    <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Router />
    </Suspense>
  </BrowserRouter>
  );
}

export default App;
