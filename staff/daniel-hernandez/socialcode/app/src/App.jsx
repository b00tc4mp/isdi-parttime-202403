import { Routes, Route, Navigate } from 'react-router-dom';
import logic from './logic';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';

const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/home" /> : <LoginPage />);
const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterPage />);
const RenderHome = () => (logic.isUserLoggedIn() ? <HomePage /> : <Navigate to="/login" />);
const RenderWildcard = () => <Navigate to={logic.isUserLoggedIn() ? '/home' : '/login'} />;

function App() {
   return (
      <Routes>
         <Route path="/login" element={<RenderLogin />} />
         <Route path="/register" element={<RenderRegister />} />
         <Route path="/home" element={<RenderHome />} />
         <Route path="/*" element={<RenderWildcard />} />
      </Routes>
   );
}

export default App;
