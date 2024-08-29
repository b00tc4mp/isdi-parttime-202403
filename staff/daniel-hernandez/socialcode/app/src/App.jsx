import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import logic from './logic';
import Alert from './components/Alert';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import { Context } from './useContext';

const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/home" /> : <LoginPage />);
const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterPage />);
const RenderHome = () => (logic.isUserLoggedIn() ? <HomePage /> : <Navigate to="/login" />);
const RenderWildcard = () => <Navigate to={logic.isUserLoggedIn() ? '/home' : '/login'} />;

function App() {
   const [message, setMessage] = useState(null);
   const handleMessage = message => setMessage(message);
   const handleAlertAccepted = () => setMessage(null);

   return (
      <Context.Provider value={{ alert: handleMessage }}>
         <Routes>
            <Route path="/login" element={<RenderLogin />} />
            <Route path="/register" element={<RenderRegister />} />
            <Route path="/home" element={<RenderHome />} />
            <Route path="/*" element={<RenderWildcard />} />
         </Routes>

         {message && <Alert message={message} onAccept={handleAlertAccepted} level="error" />}
      </Context.Provider>
   );
}

export default App;
