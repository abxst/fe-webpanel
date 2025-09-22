import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './app/login/Login';
import Dashboard from './app/dashboard/Dashboard';
import Register from './app/register/Register';

function NotFound() {
  return <div style={{ padding: 24 }}>404 - Not Found</div>;
}

function LoginPage() { return <Login />; }

// Replace this with your real authentication logic
const isAuthenticated = () => !!localStorage.getItem('authToken');

function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const publicRoutes = [
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Register /> }
];

// Add protected routes here when needed
const privateRoutes = [
  { path: '/dashboard', element: <Dashboard /> }
];

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<RequireAuth>{element}</RequireAuth>}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}


