# Debug Mode Configuration

## 🎯 Giới thiệu

Biến môi trường `REACT_APP_IS_DEBUG` cho phép bật/tắt tất cả console logs trong ứng dụng.

## ⚙️ Cấu hình

### File `.env`

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:5000

# Debug Mode (true/false)
REACT_APP_IS_DEBUG=true
```

### Các giá trị

| Giá trị | Mô tả | Sử dụng |
|---------|-------|---------|
| `true` | Bật debug mode | Development, Testing |
| `false` | Tắt debug mode | Production |

## 🔍 Chi tiết

### Khi `REACT_APP_IS_DEBUG=true`

✅ Hiển thị tất cả logs trong console:
- 🔴 **ERROR** - Lỗi với stack trace đầy đủ
- ⚠️ **WARNING** - Cảnh báo cần chú ý
- ℹ️ **INFO** - Thông tin debug (API calls, data flow)

**Example Console Output:**
```
🔴 ERROR in app/login/Login.jsx > handleSubmit
  ⏰ Timestamp: 2025-10-06T10:30:45.123Z
  📄 File: app/login/Login.jsx
  🔧 Function: handleSubmit
  ❌ Error Name: Error
  💬 Error Message: Login failed with status: 401
  📊 Stack Trace: Error: Login failed...
  ℹ️ Additional Info: {
    status: 401,
    username: "john_doe"
  }
```

### Khi `REACT_APP_IS_DEBUG=false`

❌ Không hiển thị logs trong console:
- Tối ưu performance
- Không lộ thông tin nhạy cảm
- Giảm noise trong production

**Console sẽ im lặng!** 🤫

## 📝 Use Cases

### Development (Local)

```env
REACT_APP_IS_DEBUG=true
```

**Lợi ích:**
- Debug dễ dàng
- Theo dõi flow của app
- Xem API requests/responses
- Phát hiện bugs nhanh

### Staging/Testing

```env
REACT_APP_IS_DEBUG=true
```

**Lợi ích:**
- Test và tìm bugs trước production
- Monitor performance
- Verify error handling

### Production

```env
REACT_APP_IS_DEBUG=false
```

**Lợi ích:**
- Không lộ thông tin nhạy cảm
- Giảm console overhead
- Clean user experience
- Better security

## 🚀 Cách sử dụng

### 1. Development Mode

```bash
# Trong file .env
REACT_APP_IS_DEBUG=true

# Chạy app
npm start
```

Mở **DevTools Console (F12)** để xem logs.

### 2. Production Build

```bash
# Trong file .env hoặc environment variable
REACT_APP_IS_DEBUG=false

# Build
npm run build

# Hoặc set inline
REACT_APP_IS_DEBUG=false npm run build
```

### 3. Dynamic Configuration

Có thể set environment variable trên server:

**Linux/Mac:**
```bash
export REACT_APP_IS_DEBUG=false
npm start
```

**Windows (CMD):**
```cmd
set REACT_APP_IS_DEBUG=false
npm start
```

**Windows (PowerShell):**
```powershell
$env:REACT_APP_IS_DEBUG="false"
npm start
```

## 🧪 Testing Debug Mode

### Test 1: Bật Debug Mode

1. Set `REACT_APP_IS_DEBUG=true` trong `.env`
2. Restart server: `npm start`
3. Mở DevTools Console (F12)
4. Thử login → Xem logs chi tiết
5. Thử add key → Xem API request logs

### Test 2: Tắt Debug Mode

1. Set `REACT_APP_IS_DEBUG=false` trong `.env`
2. Restart server: `npm start`
3. Mở DevTools Console (F12)
4. Thử login → **Không có logs**
5. Console sẽ im lặng hoàn toàn

## 📊 Impact

### Performance

| Mode | Console Logs | Performance Impact |
|------|--------------|-------------------|
| `true` | ✅ Enabled | Negligible (dev only) |
| `false` | ❌ Disabled | None |

### Security

| Mode | Risk Level | Notes |
|------|-----------|-------|
| `true` | ⚠️ Medium | Có thể lộ thông tin nhạy cảm |
| `false` | ✅ Low | Không log thông tin ra console |

## ⚠️ Lưu ý quan trọng

1. **Luôn tắt debug mode trong production**
   ```env
   REACT_APP_IS_DEBUG=false
   ```

2. **Restart server sau khi thay đổi .env**
   - Stop server (Ctrl+C)
   - Chạy lại `npm start`

3. **Không commit sensitive data trong logs**
   - Đừng log passwords
   - Đừng log tokens
   - Đừng log API keys

4. **Build Production**
   ```bash
   # Đảm bảo IS_DEBUG=false trước khi build
   REACT_APP_IS_DEBUG=false npm run build
   ```

## 🔗 Related Files

- `src/utils/errorHandler.js` - Error handling utility
- `ERROR_HANDLING_GUIDE.md` - Chi tiết về error handling
- `.env` - Environment variables
- `.env.example` - Template file

## 💡 Tips

### Tip 1: Git Config

Thêm vào `.gitignore` để không commit `.env`:
```gitignore
.env
```

Nhưng commit `.env.example`:
```env
# .env.example
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_IS_DEBUG=true
```

### Tip 2: Team Development

Mỗi developer có thể có config riêng:
- Dev A: `REACT_APP_IS_DEBUG=true`
- Dev B: `REACT_APP_IS_DEBUG=false` (nếu muốn clean console)

### Tip 3: CI/CD

Trong CI/CD pipeline, set:
```yaml
environment:
  REACT_APP_IS_DEBUG: false
```

## 📞 Support

Nếu gặp vấn đề:
1. Check file `.env` tồn tại
2. Check biến đúng tên: `REACT_APP_IS_DEBUG`
3. Check đã restart server chưa
4. Check console có hiển thị gì không

## ✅ Checklist

- [ ] Đã tạo file `.env`
- [ ] Đã set `REACT_APP_IS_DEBUG=true` (development)
- [ ] Đã restart server
- [ ] Đã test console logs
- [ ] Đã set `REACT_APP_IS_DEBUG=false` (production)
- [ ] Đã test không có logs khi false

