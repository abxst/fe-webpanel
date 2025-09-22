import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div style={{ flex: 1, padding: 24, background: '#000000' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ display: 'none', marginBottom: '16px', background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
          className="mobile-toggle"
        >
          ☰ Menu
        </button>
        {children}
      </div>
    </div>
  );
}
