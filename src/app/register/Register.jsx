import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login/Login.css'; // Reusing login styles for consistency

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const prefix = formData.get('prefix');
    const password = formData.get('password');

    fetch('https://api.hainth.edu.vn/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, prefix, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Registration successful:', data);
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      })
      .catch(error => {
        console.error('Error during registration:', error);
        alert('Đăng ký thất bại. Vui lòng thử lại.');
      });
  }

  return (
    <div className="login-page"> {/* Reusing login-page class */}
      <div className="login-card" role="main">
        <div className="card-section card-section--dark">
          <div className="brand">
            <div className="brand-logo" aria-hidden="true">◼︎</div>
            <div className="brand-name">WebPanel</div>
          </div>
          <h1 className="title">Đăng ký</h1>
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


            <label className="field">
              <span className="label">Prefix</span>
              <input
                type="text"
                name="prefix"
                placeholder="prefix"
                required
                className="input"
              />
            </label>

            <div className="actions">
              <button type="submit" className="submit">Đăng ký</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
