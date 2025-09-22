import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css'; // Import global CSS for consistency
import './Login.css';

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token); // Assuming API returns { token }
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Error during login:', error);
        alert('Đăng nhập thất bại. Vui lòng thử lại.');
      });
  }

  return (
    <div className="login-page">
      <div className="login-card" role="main">
        <div className="card-section card-section--dark">
          <div className="brand">
            <div className="brand-logo" aria-hidden="true">◼︎</div>
            <div className="brand-name">WebPanel</div>
          </div>
          <h1 className="title">Đăng nhập</h1>
        </div>

        <div className="card-section card-section--light">
          <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
            <label className="field">
              <span className="label">Tên đăng nhập</span>
              <input
                type="text"
                name="username"
                placeholder="tên đăng nhập"
                required
                className="input"
              />
            </label>

            <label className="field">
              <span className="label">Mật khẩu</span>
              <div className="password-row">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="input password"
                />
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setIsPasswordVisible(v => !v)}
                  aria-label={isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {isPasswordVisible ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </label>

            <div className="actions">
              <button type="submit" className="submit">Đăng nhập</button>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  );
}


