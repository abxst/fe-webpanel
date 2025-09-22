import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [keys, setKeys] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(1); // Assuming we can derive this; adjust based on API response

  useEffect(() => {
    fetch(`https://api.hainth.edu.vn/get-key`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch keys');
        }
        return response.json();
      })
      .then(data => {
        setKeys(data.data);
        // Assuming API returns total count or pages; here we mock totalPages for demo
        // If API provides total, calculate: setTotalPages(Math.ceil(data.total / pageSize));
        setTotalPages(10); // Placeholder; replace with real logic
      })
      .catch(error => {
        console.error('Error fetching keys:', error);
        alert('Lỗi khi tải dữ liệu key.');
      });
  }, [page, pageSize]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard! This is a protected page.</p>
      
      <h2>Danh sách Key</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Key</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Time Start</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Time End</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Length</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Prefix</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(key => (
            <tr key={key.id_key}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{key.id_key}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{key.key}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{key.time_start || 'N/A'}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{key.time_end || 'N/A'}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{key.length}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{key.prefix}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ marginTop: 16 }}>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
          style={{ marginRight: 8 }}
        >
          Trang trước
        </button>
        <span>Trang {page} / {totalPages} </span>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
          disabled={page === totalPages}
          style={{ marginLeft: 8 }}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}
