import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { apiFetch } from '../../utils/api';

export default function Dashboard() {
  const [keys, setKeys] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(1); // Assuming we can derive this; adjust based on API response
  const [userInfo, setUserInfo] = useState(null); // New state for user info

  // Fetch user info on mount
  useEffect(() => {
    apiFetch('https://api.hainth.edu.vn/get-info', { method: 'GET' })
      .then(data => {
        setUserInfo(data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        alert('Lỗi khi tải thông tin người dùng.');
      });
  }, []);

  // Existing fetch for keys
  useEffect(() => {
    apiFetch('https://api.hainth.edu.vn/get-key', { method: 'GET' })
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
    <Layout>
      
      {userInfo && userInfo.status === 'ok' && userInfo.data.length > 0 ? (
        <div style={{ color: '#ffffff' }}>
          <h2>Thông tin người dùng</h2>
          {userInfo.data.map(user => (
            <div key={user.id} style={{ marginBottom: '16px' }}>
              <p>ID: {user.id}</p>
              <p>Tên đăng nhập: {user.username}</p>
              <p>Prefix: {user.prefix}</p>
              <p>Last Login: {user.last_login || 'Chưa có'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#ffffff' }}>Đang tải thông tin người dùng...</p>
      )}
      
      <h2 style={{ color: '#ffffff' }}>Danh sách Key</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ffffff' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ffffff', padding: 8, background: '#111111' }}>ID</th>
            <th style={{ border: '1px solid #ffffff', padding: 8, background: '#111111' }}>Key</th>
            <th style={{ border: '1px solid #ffffff', padding: 8, background: '#111111' }}>Time Start</th>
            <th style={{ border: '1px solid #ffffff', padding: 8, background: '#111111' }}>Time End</th>
            <th style={{ border: '1px solid #ffffff', padding: 8, background: '#111111' }}>Length</th>
            <th style={{ border: '1px solid #ffffff', padding: 8, background: '#111111' }}>Prefix</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(key => (
            <tr key={key.id_key}>
              <td style={{ border: '1px solid #ffffff', padding: 8 }}>{key.id_key}</td>
              <td style={{ border: '1px solid #ffffff', padding: 8 }}>{key.key}</td>
              <td style={{ border: '1px solid #ffffff', padding: 8 }}>{key.time_start || 'N/A'}</td>
              <td style={{ border: '1px solid #ffffff', padding: 8 }}>{key.time_end || 'N/A'}</td>
              <td style={{ border: '1px solid #ffffff', padding: 8 }}>{key.length}</td>
              <td style={{ border: '1px solid #ffffff', padding: 8 }}>{key.prefix}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ marginTop: 16, color: '#ffffff' }}>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
          style={{ marginRight: 8, background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Trang trước
        </button>
        <span>Trang {page} / {totalPages} </span>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
          disabled={page === totalPages}
          style={{ marginLeft: 8, background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Trang sau
        </button>
      </div>
    </Layout>
  );
}
