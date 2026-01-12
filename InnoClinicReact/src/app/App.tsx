import { useRoutes, BrowserRouter } from 'react-router-dom';
import { useAuth } from '../modules/auth/hoocks/use-auth';
import { getRoutes } from '../routes/routes-config';

const AppContent = () => {
  const { user } = useAuth();
  const element = useRoutes(getRoutes(user));
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;