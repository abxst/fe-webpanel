import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { apiFetch } from '../../utils/api';

export default function AddKey() {
  const [amount, setAmount] = useState(1);
  const [length, setLength] = useState(7);
  const [keys, setKeys] = useState([]);
  const [generated, setGenerated] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await apiFetch('https://api.hainth.edu.vn/add-key', {
        method: 'POST',
        body: JSON.stringify({ amount: parseInt(amount), length: parseInt(length) }),
      });
      setKeys(data.keys);
      setGenerated(data.generated);
    } catch (error) {
      alert('Lỗi khi tạo key.');
    }
  };

  return (
    <Layout>
      <h1 style={{ color: '#ffffff' }}>Add Key</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff' }}>
          Số lượng key:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            required
            style={{ marginLeft: '8px', padding: '4px', border: '1px solid #ffffff', background: '#000000', color: '#ffffff' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '16px', color: '#ffffff' }}>
          Độ dài:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="1"
            required
            style={{ marginLeft: '8px', padding: '4px', border: '1px solid #ffffff', background: '#000000', color: '#ffffff' }}
          />
        </label>
        <button type="submit" style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '8px 16px', cursor: 'pointer' }}>
          Tạo Key
        </button>
      </form>
      {generated !== null && (
        <p style={{ color: '#ffffff' }}>Đã tạo {generated} key.</p>
      )}
      {keys.length > 0 && (
        <div>
          <h2 style={{ color: '#ffffff' }}>Danh sách Key</h2>
          <button
            onClick={() => {
              navigator.clipboard.writeText(keys.map(k => k.key).join('\n'));
              alert(`Đã copy ${keys.length} key`);
            }}
            style={{ marginBottom: '16px', background: '#ffffff', color: '#000000', border: '1px solid #ffffff', padding: '8px 16px', cursor: 'pointer' }}
          >
            Copy All Keys
          </button>
          <ul style={{ listStyle: 'none', padding: 0 }}>
              {keys.map((key, index) => (
                <li key={index} style={{ marginBottom: '8px', color: '#ffffff' }}>
                  {key.key}
                </li>
              ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}