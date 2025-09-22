import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { apiFetch } from '../../utils/api';

export default function ResetKey() {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await apiFetch('/reset-key', {
        method: 'POST',
        body: JSON.stringify({ key }),
      });
      if (data.status === 'ok') {
        setMessage('Key đã được reset thành công (id_device set to NULL).');
      } else {
        setMessage('Reset key thất bại.');
      }
    } catch (error) {
      setMessage('Lỗi khi reset key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 style={{ color: '#ffffff' }}>Reset Key</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff' }}>
          Key cần reset:
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
            style={{ marginLeft: '8px', padding: '4px', border: '1px solid #ffffff', background: '#000000', color: '#ffffff', width: '300px' }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#cccccc' : '#ffffff',
            color: '#000000',
            border: '1px solid #ffffff',
            padding: '8px 16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? 'Đang reset...' : 'Reset Key'}
        </button>
      </form>
      {loading && <p style={{ color: '#ffffff' }}>Vui lòng đợi...</p>}
      {message && <p style={{ color: '#ffffff' }}>{message}</p>}
    </Layout>
  );
}
