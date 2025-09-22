import React from 'react';

export default function Sidebar({ isOpen, onToggle }) {
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
          <button style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: '#000000', color: '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', cursor: 'pointer' }}>Dashboard</button>
        </li>
        <li style={{ marginBottom: '8px' }}>
          <button style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: '#000000', color: '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', cursor: 'pointer' }}>Add key</button>
        </li>
        <li style={{ marginBottom: '8px' }}>
          <button style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: '#000000', color: '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', cursor: 'pointer' }}>Delete key</button>
        </li>
      </ul>
    </div>
  );
}
