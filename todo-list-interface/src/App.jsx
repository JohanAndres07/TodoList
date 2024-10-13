import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Body/login/Login';
import { Register } from './components/Body/register/Register'; 
import { Body } from "./components/Body/Body";
import { AuthProvider, useAuth } from './components/services/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
