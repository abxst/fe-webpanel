import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import App from './App';
import Login from './app/login/Login';
import Dashboard from './app/dashboard/Dashboard';
import Register from './app/register/Register';
import AddKey from './app/add-key/AddKey';
import DeleteKey from './app/delete-key/DeleteKey';
import ResetKey from './app/reset-key/ResetKey';

function NotFound() {
  return <div style={{ padding: 24 }}>404 - Not Found</div>;
}

function LoginPage() { return <Login />; }

// Remove fake auth
// const isAuthenticated = () => !!localStorage.getItem('authToken');

// function RequireAuth({ children }) {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// }

const publicRoutes = [
  // { path: '/', element: <App /> }, // Removed original root
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Register /> }
];

// Add previously private routes here without protection
const allRoutes = [
  ...publicRoutes,
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/add-key', element: <AddKey /> },
  { path: '/delete-key', element: <DeleteKey /> },
  { path: '/reset-key', element: <ResetKey /> }

  // Add more if needed
];

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
        <Routes>
          {allRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}


