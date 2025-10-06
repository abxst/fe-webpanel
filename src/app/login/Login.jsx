import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logError, logInfo } from '../../utils/errorHandler';
import '../../index.css'; // Import global CSS for consistency
import './Login.css';

const FILE_NAME = 'app/login/Login.jsx';

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    const FUNCTION_NAME = 'handleSubmit';
    
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const username = formData.get('username');
      const password = formData.get('password');

      logInfo('Attempting login', FUNCTION_NAME, FILE_NAME, { username });

      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      
      if (!BACKEND_URL) {
        const error = new Error('REACT_APP_BACKEND_URL is not defined');
        logError(error, FUNCTION_NAME, FILE_NAME);
        alert('Lỗi cấu hình hệ thống. Vui lòng liên hệ admin.');
        return;
      }

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
            const error = new Error(`Login failed with status: ${response.status}`);
            logError(error, FUNCTION_NAME, FILE_NAME, {
              status: response.status,
              statusText: response.statusText,
              username,
            });
            throw error;
          }
          return response.json();
        })
        .then(data => {
          logInfo('Login successful', FUNCTION_NAME, FILE_NAME, { username });
          localStorage.setItem('authToken', data.token); // Assuming API returns { token }
          navigate('/dashboard');
        })
        .catch(error => {
          logError(error, FUNCTION_NAME, FILE_NAME, {
            username,
            errorType: 'Login request failed',
          });
          alert('Đăng nhập thất bại. Vui lòng thử lại.');
        });
    } catch (error) {
      logError(error, FUNCTION_NAME, FILE_NAME, {
        errorType: 'Unexpected error in handleSubmit',
      });
      alert('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
    }
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
                placeholder=""
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
                  placeholder=""
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


