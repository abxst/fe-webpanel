import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../utils/api';

export default function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      //const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      await apiFetch('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      navigate('/login');
    }
  };

  return (
    <div
      className="sidebar"
      style={{
        width: isOpen ? '200px' : '0',
        background: '#000000',
        padding: isOpen ? '16px' : '0',
        borderRight: isOpen ? '1px solid #ffffff' : 'none',
        color: '#ffffff',
        overflow: 'hidden',
        transition: 'width 0.3s, padding 0.3s'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, marginBottom: '16px', fontWeight: 600 }}>Menu</h3>
        <button
          onClick={onToggle}
          style={{ background: 'none', color: '#ffffff', border: 'none', cursor: 'pointer', fontSize: '16px' }}
          className="close-btn"
        >
          ✕
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          <Link to="/dashboard" style={{ display: 'block', padding: '8px 12px', background: location.pathname === '/dashboard' ? '#ffffff' : '#000000', color: location.pathname === '/dashboard' ? '#000000' : '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', textDecoration: 'none', cursor: 'pointer' }}>
            Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: '8px' }}>
          <Link to="/add-key" style={{ display: 'block', padding: '8px 12px', background: location.pathname === '/add-key' ? '#ffffff' : '#000000', color: location.pathname === '/add-key' ? '#000000' : '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', textDecoration: 'none', cursor: 'pointer' }}>
            Add key
          </Link>
        </li>
        <li style={{ marginBottom: '8px' }}>
          <Link to="/delete-key" style={{ display: 'block', padding: '8px 12px', background: location.pathname === '/delete-key' ? '#ffffff' : '#000000', color: location.pathname === '/delete-key' ? '#000000' : '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', textDecoration: 'none', cursor: 'pointer' }}>
            Delete key
          </Link>
        </li>
        <li style={{ marginBottom: '8px' }}>
          <button
            onClick={handleLogout}
            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: '#000000', color: '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
