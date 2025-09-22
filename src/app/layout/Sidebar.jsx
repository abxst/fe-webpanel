import React from 'react';

export default function Sidebar() {
  return (
    <div style={{ width: '200px', background: '#000000', padding: '16px', borderRight: '1px solid #ffffff', color: '#ffffff' }}>
      <h3 style={{ margin: 0, marginBottom: '16px', fontWeight: 600 }}>Menu</h3>
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
